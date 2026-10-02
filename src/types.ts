export interface TaxonomyData {
  what_users_remember: string[];
  what_users_forget: string[];
  search_behavior: string[];
  retrieval_barriers: string[];
  photo_content_type: string[];
  user_scenario: string[];
  problem_cluster: string[];
}

export interface UnifiedResearchRecord {
  record_id: string;
  source_type: 'play_store' | 'reddit' | 'google_search' | 'user_survey';
  source_url?: string | null;
  created_at?: string | null;
  user_identifier?: string | null;
  primary_text: string;
  secondary_text?: string | null;
  search_query_used?: string | null;
  rating_score?: number | null;
  usage_frequency?: string | null;
  library_size?: string | null;
  struggle_frequency?: string | null;
  survey_photo_types?: string[];
  survey_memory_cues?: string[];
  survey_search_methods?: string[];
  survey_outcome?: string | null;
  taxonomy: TaxonomyData;
}

export type SourceFilter = 'all' | 'play_store' | 'reddit' | 'google_search' | 'user_survey';

export interface CategoryStat {
  category: string;
  count: number;
  percentage: number;
}

export interface ProblemClusterDetail {
  id: string;
  title: string;
  count: number;
  percentage: number;
  description: string;
  sources: { play_store: number; reddit: number; google_search: number; user_survey: number };
  sampleRecords: UnifiedResearchRecord[];
}

export interface KeyInsight {
  id: string;
  title: string;
  explanation: string;
  evidenceCount: number;
  percentage: number;
  sources: string[];
  confidence: 'High' | 'Medium' | 'Low';
  supportingExamples: UnifiedResearchRecord[];
}

export interface UserScenario {
  id: string;
  title: string;
  remembered: string;
  forgotten: string;
  searchBehavior: string;
  failureMode: string;
  evidenceCount: number;
  sampleEvidence: UnifiedResearchRecord[];
}

export interface OpportunityArea {
  id: string;
  title: string;
  userProblem: string;
  evidenceCount: number;
  currentBreakdown: string;
  userNeed: string;
  opportunity: string;
  potentialMvp: string;
  successMetric: string;
  openQuestions: string[];
}

export interface MvpHypothesis {
  id: string;
  title: string;
  problem: string;
  targetUserScenario: string;
  userNeed: string;
  proposedCapability: string;
  evidenceCount: number;
  successMetric: string;
  openQuestion: string;
}
