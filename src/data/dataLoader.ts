import rawData from './normalized_research_data.json';
import { UnifiedResearchRecord, SourceFilter, CategoryStat, ProblemClusterDetail, KeyInsight, UserScenario, OpportunityArea, MvpHypothesis } from '../types';

export const allRecords = rawData as UnifiedResearchRecord[];

export function getFilteredRecords(source: SourceFilter): UnifiedResearchRecord[] {
  if (source === 'all') return allRecords;
  return allRecords.filter(r => r.source_type === source);
}

export function getSourceStats(records: UnifiedResearchRecord[]) {
  const total = records.length;
  const playStore = records.filter(r => r.source_type === 'play_store').length;
  const reddit = records.filter(r => r.source_type === 'reddit').length;
  const googleSearch = records.filter(r => r.source_type === 'google_search').length;
  const survey = records.filter(r => r.source_type === 'user_survey').length;
  
  // Relevant Retrieval Experiences (records where users describe memory/search/struggles)
  const relevantRetrieval = records.filter(r => {
    if (r.source_type === 'user_survey') return true;
    if (r.source_type === 'google_search') return true;
    const text = (r.primary_text + ' ' + (r.secondary_text || '')).toLowerCase();
    return text.includes('search') || text.includes('find') || text.includes('photo') || text.includes('album') || text.includes('remember') || text.includes('date');
  }).length;

  return {
    total,
    playStore,
    reddit,
    googleSearch,
    survey,
    relevantRetrieval
  };
}

export function getTaxonomyCategoryStats(
  records: UnifiedResearchRecord[], 
  key: keyof UnifiedResearchRecord['taxonomy']
): CategoryStat[] {
  const counts: Record<string, number> = {};
  records.forEach(r => {
    const items = r.taxonomy[key] || [];
    items.forEach(item => {
      counts[item] = (counts[item] || 0) + 1;
    });
  });

  const totalRecords = records.length || 1;
  return Object.entries(counts)
    .map(([category, count]) => ({
      category,
      count,
      percentage: Number(((count / totalRecords) * 100).toFixed(1))
    }))
    .sort((a, b) => b.count - a.count);
}

export function getProblemClusterDetails(records: UnifiedResearchRecord[]): ProblemClusterDetail[] {
  const total = records.length || 1;
  const clusters = [
    {
      id: 'cluster-1',
      title: 'Search Precision & Natural Language AI Failure',
      description: 'Users query using memories ("dog in a hat", "passport", "childhood pictures") but AI/search returns unrelated photos, "Nothing found", or random clutter.',
      matchFn: (r: UnifiedResearchRecord) => r.taxonomy.problem_cluster.includes('Search Precision & Natural Language Failure')
    },
    {
      id: 'cluster-2',
      title: 'Library Organization & Sorting Chaos',
      description: 'Cloud sync tools deposit new media "loose" without album placement, forcing exhausting manual sorting. Chronological scroll fatigue makes finding recent screenshots/restores difficult.',
      matchFn: (r: UnifiedResearchRecord) => r.taxonomy.problem_cluster.includes('Library Organization & Sorting Chaos')
    },
    {
      id: 'cluster-3',
      title: 'Sync, Restore & Media Picker Workflow Failure',
      description: 'Restoring old cloud photos places them back on 6-year-old calendar dates rather than recent uploads. Android Media Picker fails to populate cloud media in 3rd-party apps.',
      matchFn: (r: UnifiedResearchRecord) => r.taxonomy.problem_cluster.includes('Sync, Restore & Media Picker Failure')
    },
    {
      id: 'cluster-4',
      title: 'Editing & Workflow Integration Friction',
      description: 'Video editor crashes lock out background apps (e.g., Spotify). Deprecation of essential features like the Perspective tool breaks architectural and document editing.',
      matchFn: (r: UnifiedResearchRecord) => r.taxonomy.problem_cluster.includes('Editing & Workflow Integration Friction')
    },
    {
      id: 'cluster-5',
      title: 'Storage & Deduplication Management',
      description: 'Forced auto-backup turns on unexpectedly. Deleting from cloud storage automatically deletes local device copies. Lack of automated batch deduplication.',
      matchFn: (r: UnifiedResearchRecord) => r.taxonomy.problem_cluster.includes('Storage & Deduplication Management')
    }
  ];

  return clusters.map(c => {
    const matched = records.filter(c.matchFn);
    const count = matched.length;
    return {
      id: c.id,
      title: c.title,
      count,
      percentage: Number(((count / total) * 100).toFixed(1)),
      description: c.description,
      sources: {
        play_store: matched.filter(r => r.source_type === 'play_store').length,
        reddit: matched.filter(r => r.source_type === 'reddit').length,
        google_search: matched.filter(r => r.source_type === 'google_search').length,
        user_survey: matched.filter(r => r.source_type === 'user_survey').length
      },
      sampleRecords: matched.slice(0, 5)
    };
  });
}

export function getKeyInsights(records: UnifiedResearchRecord[]): KeyInsight[] {
  const total = records.length || 1;

  const cluster1 = records.filter(r => r.taxonomy.problem_cluster.includes('Search Precision & Natural Language Failure'));
  const cluster2 = records.filter(r => r.taxonomy.problem_cluster.includes('Library Organization & Sorting Chaos'));
  const cluster3 = records.filter(r => r.taxonomy.problem_cluster.includes('Sync, Restore & Media Picker Failure'));
  const cluster5 = records.filter(r => r.taxonomy.problem_cluster.includes('Storage & Deduplication Management'));

  return [
    {
      id: 'insight-1',
      title: 'Descriptive Memory vs. Indexable Metadata Mismatch',
      explanation: 'Users remember photos using rich context (who was in it, where they went, what was happening), but traditional search relies heavily on exact dates, OCR text, or strict keywords.',
      evidenceCount: cluster1.length,
      percentage: Number(((cluster1.length / total) * 100).toFixed(1)),
      sources: ['Reddit', 'Play Store', 'Google Search', 'Survey'],
      confidence: 'High',
      supportingExamples: cluster1.slice(0, 4)
    },
    {
      id: 'insight-2',
      title: 'Chronological Restores Create Timeline Dislocation',
      explanation: 'When users restore or import historical photos (e.g. 6-year-old family or medical photos), Google Photos places them at their original EXIF date rather than top of main feed, forcing deep scrolling.',
      evidenceCount: cluster3.length,
      percentage: Number(((cluster3.length / total) * 100).toFixed(1)),
      sources: ['Play Store', 'Reddit', 'Survey'],
      confidence: 'High',
      supportingExamples: cluster3.slice(0, 4)
    },
    {
      id: 'insight-3',
      title: 'Un-albumed Media Causes Manual Sorting Burnout',
      explanation: 'Photos synced via cloud tools arrive "loose" in the main gallery feed. Users lack a single filter to view "Photos not in any manual album," causing severe organization fatigue.',
      evidenceCount: cluster2.length,
      percentage: Number(((cluster2.length / total) * 100).toFixed(1)),
      sources: ['Play Store', 'Reddit'],
      confidence: 'High',
      supportingExamples: cluster2.slice(0, 4)
    },
    {
      id: 'insight-4',
      title: 'Cloud vs. Local Storage Deletion Sync Confusion',
      explanation: 'Users trying to free up cloud storage mistakenly delete items from their local device gallery due to mandatory auto-sync behavior, leading to fear of permanent media loss.',
      evidenceCount: cluster5.length,
      percentage: Number(((cluster5.length / total) * 100).toFixed(1)),
      sources: ['Play Store', 'Reddit'],
      confidence: 'Medium',
      supportingExamples: cluster5.slice(0, 4)
    }
  ];
}

export function getUserScenarios(records: UnifiedResearchRecord[]): UserScenario[] {
  return [
    {
      id: 'scenario-1',
      title: 'Retrieving an Urgent Document / Medical Record',
      remembered: 'Type of item (Pet medical report / Passport receipt) + approximate time frame',
      forgotten: 'Exact date taken, exact filename, specific album name',
      searchBehavior: 'Keyword search for "passport" or "prescription", followed by scrolling',
      failureMode: 'Search returns unrelated photos or "Nothing found"; user gives up or checks external messaging',
      evidenceCount: records.filter(r => r.taxonomy.photo_content_type.includes('Document / Receipt') || r.taxonomy.photo_content_type.includes('Medical / Health Record')).length,
      sampleEvidence: records.filter(r => r.taxonomy.photo_content_type.includes('Document / Receipt') || r.taxonomy.photo_content_type.includes('Medical / Health Record')).slice(0, 3)
    },
    {
      id: 'scenario-2',
      title: 'Finding a Vacation / Trip Memory',
      remembered: 'Location/Landmark + people present + trip activities (e.g. Aras River, beach)',
      forgotten: 'Exact calendar date, exact hotel/restaurant name',
      searchBehavior: 'Location search + year filter + manual chronological scrolling',
      failureMode: 'Too many photos returned without sub-grouping by event or context',
      evidenceCount: records.filter(r => r.taxonomy.photo_content_type.includes('Trip / Vacation Photo')).length,
      sampleEvidence: records.filter(r => r.taxonomy.photo_content_type.includes('Trip / Vacation Photo')).slice(0, 3)
    },
    {
      id: 'scenario-3',
      title: 'Sharing Media via 3rd-Party App Media Picker',
      remembered: 'Photo is stored in Google Photos Cloud library',
      forgotten: 'Local device file system path',
      searchBehavior: 'Opening Android Media Picker inside third-party app',
      failureMode: 'Media Picker fails to populate cloud collections; device settings locked',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Broken Media Picker Workflow')).length,
      sampleEvidence: records.filter(r => r.taxonomy.retrieval_barriers.includes('Broken Media Picker Workflow')).slice(0, 3)
    },
    {
      id: 'scenario-4',
      title: 'Deduplicating & Sorting a Large Library',
      remembered: 'High volume of duplicate images imported from Google Drive / Cloud Sync',
      forgotten: 'Which duplicates are safe to delete',
      searchBehavior: 'Checking manual albums, scrolling "Recently Added"',
      failureMode: 'No single button for batch deduplication or un-albumed photo grouping',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Duplicate Sprawl & Clutter') || r.taxonomy.retrieval_barriers.includes('Loose Un-albumed Photos')).length,
      sampleEvidence: records.filter(r => r.taxonomy.retrieval_barriers.includes('Duplicate Sprawl & Clutter') || r.taxonomy.retrieval_barriers.includes('Loose Un-albumed Photos')).slice(0, 3)
    }
  ];
}

export function getOpportunityAreas(records: UnifiedResearchRecord[]): OpportunityArea[] {
  return [
    {
      id: 'opp-1',
      title: 'Contextual Memory Query Translation Engine',
      userProblem: 'Users cannot translate rich contextual memories (who, where, activity) into exact dates or OCR keywords.',
      evidenceCount: records.filter(r => r.taxonomy.problem_cluster.includes('Search Precision & Natural Language Failure')).length,
      currentBreakdown: 'Search relies heavily on literal keyword matching or rigid face tags, leading to empty or irrelevant result sets.',
      userNeed: 'Ability to describe a photo naturally (e.g., "my pet medicine bill from last year" or "dog in a hat") and receive ranked candidate photos.',
      opportunity: 'Leverage LLM multimodal reasoning to map imprecise human memory cues into multi-dimensional metadata search filters.',
      potentialMvp: 'Natural Language Memory Query Prompt bar with visual memory cue chips (Who, Where, When, What).',
      successMetric: '85% reduction in zero-result searches for natural language queries.',
      openQuestions: ['How to maintain fast search latency over 10,000+ photo libraries on-device?']
    },
    {
      id: 'opp-2',
      title: 'Chronological & Import View Smart Stacking',
      userProblem: 'Restoring old photos places them deep in calendar history, making newly imported media invisible.',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Chronological Date Reset on Restore')).length,
      currentBreakdown: 'Photos strictly render by EXIF date without an optional "Sort by Date Uploaded/Restored" toggle.',
      userNeed: 'Clear distinction between when a photo was taken vs. when it was added to the library.',
      opportunity: 'Introduce an "Imported / Restored Stacks" view so users can immediately access newly synced media regardless of EXIF date.',
      potentialMvp: '"Recently Added / Restored" smart shelf at top of library view.',
      successMetric: '70% reduction in scrolling time for restored cloud photos.',
      openQuestions: ['Should restored photo stacks automatically merge into existing albums?']
    },
    {
      id: 'opp-3',
      title: 'Un-Albumed & Duplicate Management Workbench',
      userProblem: 'Cloud sync tools create loose un-albumed photos and duplicate clutter across Google Drive and Photos.',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Loose Un-albumed Photos') || r.taxonomy.retrieval_barriers.includes('Duplicate Sprawl & Clutter')).length,
      currentBreakdown: 'No quick filter to isolate photos not yet in any manual album, and deduplication requires manual line-by-line inspection.',
      userNeed: 'One-tap filter to see un-organized photos and safe one-click deduplication.',
      opportunity: 'Smart Library Assistant that automatically stacks exact & near duplicates and offers a dedicated "Un-albumed Photos" filter.',
      potentialMvp: '"Clean Up Library" hub featuring "Un-albumed Media" filter and "Review Duplicates" tool.',
      successMetric: '50% decrease in manual sorting time reported by high-volume users.',
      openQuestions: ['How to prevent accidental deletion during automated duplicate merging?']
    }
  ];
}

export function getMvpHypotheses(records: UnifiedResearchRecord[]): MvpHypothesis[] {
  return [
    {
      id: 'mvp-1',
      title: 'AI-Powered Contextual Memory Search',
      problem: 'Users remember experience context (who, where, activity) but forget exact dates or keywords, causing search failure.',
      targetUserScenario: 'Users looking for a document, trip photo, or pet image from 2+ years ago.',
      userNeed: 'Flexible natural-language search combining multi-attribute memory cues.',
      proposedCapability: 'Interactive "Ask Photos" query bar with instant context-tag suggestions (Person, Place, Date range, Object).',
      evidenceCount: records.filter(r => r.taxonomy.problem_cluster.includes('Search Precision & Natural Language Failure')).length,
      successMetric: '30% increase in successful retrieval for queries containing >2 context attributes.',
      openQuestion: 'How can the UI convey confidence when multiple candidate photos match the memory description?'
    },
    {
      id: 'mvp-2',
      title: 'Recently Uploaded / Restored Media Smart Shelf',
      problem: 'Restoring historical photos hides them deep in the calendar timeline (e.g. 2020), forcing users to scroll through thousands of items.',
      targetUserScenario: 'Restoring or editing old family photos for a recent order or project.',
      userNeed: 'Immediate access to photos added to the cloud today, irrespective of camera creation date.',
      proposedCapability: 'Dedicated "Recently Added & Restored" view toggle at top of main gallery.',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Chronological Date Reset on Restore')).length,
      successMetric: '90% drop in user complaints regarding lost restored photos.',
      openQuestion: 'Should restored media remain in "Recently Added" permanently or expire after 30 days?'
    },
    {
      id: 'mvp-3',
      title: 'Un-Albumed Photo Quick-Sorter',
      problem: 'Cloud sync tools import thousands of photos loose into main feed, creating overwhelming manual sorting work.',
      targetUserScenario: 'Power users syncing media from external tools or cloud backup services.',
      userNeed: 'Filter to view only photos not belonging to any manual album.',
      proposedCapability: 'Filter pill "Not in Album" with drag-to-album batch sorting drawer.',
      evidenceCount: records.filter(r => r.taxonomy.retrieval_barriers.includes('Loose Un-albumed Photos')).length,
      successMetric: '40% increase in monthly album creation activity.',
      openQuestion: 'Will auto-suggested album grouping reduce the need for manual sorting entirely?'
    }
  ];
}
