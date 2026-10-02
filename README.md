# Google Photos - Memory Search Intelligence Platform

> **Product Discovery Intelligence Command Center**  
> *"Understanding how people retrieve photos they remember but cannot precisely describe."*

---

## 📌 Executive Overview

**Google Photos Memory Search Intelligence** is an interactive, evidence-backed Product Research Intelligence Platform designed for the Google Photos Product Manager (PM) Assignment.

The platform bridges the gap between human cognitive memory and machine-indexable photo metadata. It is grounded exclusively in **2,535 real normalized research records** gathered across 4 distinct qualitative and quantitative research channels.

- ❌ **Zero Mock / Demo Data**: No fabricated statistics, quotes, or findings.
- 📊 **Dynamic Data Engine**: Every chart, percentage, sample size, and metric calculates in real-time from the dataset.
- 🎯 **PM Strategy Focused**: Moves systematically from raw evidence to user memory patterns, retrieval barriers, problem clusters, root cause maps, opportunity areas, and MVP hypotheses.

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js (v18.0 or higher)
- npm (v9.0 or higher)

### 1. Installation
Navigate to the project root and install dependencies:
```bash
cd /Users/shweta/.gemini/antigravity/scratch/memory-search-intelligence
npm install
```

### 2. Run Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open your browser at: [`http://localhost:3000/`](http://localhost:3000/)

### 3. Production Build
Verify TypeScript compilation and generate optimized static assets:
```bash
npm run build
```

---

## 📊 Research Data & Multi-Source Channels

The platform ingests and normalizes **2,535 total research records** into a standardized schema (`UnifiedResearchRecord`):

| Source Channel | Format | Total Records | Description |
| :--- | :--- | :--- | :--- |
| **Google Play Store Reviews** | CSV | **18** | User reviews for `com.google.android.apps.photos` covering search degradation, restore date resets, and feature removals. |
| **Reddit Community Discussions** | CSV (Apify Scrape) | **2,490** | Unfiltered community threads and comments from r/googlephotos, r/insanepeoplefacebook, and related subreddits. |
| **Google Search Snippets** | CSV (Apify SERP) | **10** | SERP search snippets for queries related to difficulty finding old photos and photo organization. |
| **Primary User Survey** | Google Forms | **17** | Quantitative and qualitative survey responses detailing library sizes, search habits, and lost-photo stories. |

---

## 🗺️ Core User & PM Research Journey

```
RAW RESEARCH (2,535 Records)
  ├── WHAT USERS REMEMBER
  ├── WHAT USERS FORGET
  ├── HOW THEY SEARCH
  ├── WHERE RETRIEVAL BREAKS
  ├── PROBLEM CLUSTERS
  ├── KEY INSIGHTS
  ├── OPPORTUNITY AREAS
  └── MVP HYPOTHESES
```

---

## 🖥️ Platform Navigation (15 Interactive Sidebar Pages)

1. **1. Overview**: Executive dashboard with KPI metric cards, core Research Question Card, and 4 Research Pillars.
2. **2. Research Sources**: Multi-channel comparison matrix across Play Store, Reddit, Search, and Survey with platform-wide source filtering.
3. **3. What Users Remember**: Frequency & percentage breakdown of remembered context (Person, Location, Time, Event, Object, Ambience) with evidence drill-downs.
4. **4. What Users Forget**: Frequency analysis of missing metadata paired with a visual **REMEMBERED vs FORGOTTEN** comparison card.
5. **5. Search Behavior**: Observed 4-stage user retrieval journey (`MEMORY → QUERY FORMULATION → SEARCH & SCROLL → OUTCOME`) and search modality analysis.
6. **6. Retrieval Problems**: Clustered retrieval barriers (Unrelated search results, chronological date resets on restore, missing media, duplicate sprawl, loose photos).
7. **7. User Scenarios**: Evidence-backed scenario archetypes (Urgent Document Search, Vacation Memories, 3rd-Party App Media Picker, Deduplication).
8. **8. Key Insights**: 4 evidence-backed PM insights complete with sample size percentages, confidence badges (High/Medium), and evidence cards.
9. **9. Problem Clusters**: Deep dive into the 5 major PM Problem Clusters.
10. **10. Root Causes**: Interactive 7-step evidence-based root cause map tracing memory trigger to query mismatch and task abandonment.
11. **11. Opportunity Areas**: Strategic PM opportunity cards detailing `USER PROBLEM | EVIDENCE | CURRENT BREAKDOWN | USER NEED | OPPORTUNITY | POTENTIAL MVP | SUCCESS METRIC | OPEN QUESTIONS`.
12. **12. MVP Hypotheses**: 3 evidence-backed product hypotheses (AI-Powered Contextual Memory Search, Recently Restored Media Smart Shelf, Un-Albumed Photo Quick-Sorter).
13. **13. Evidence Explorer**: Searchable & filterable evidence table across all 2,535 records with keyword search, cluster filters, and interactive **Evidence Inspector Modal**.
14. **14. Survey Results**: Dedicated survey analysis dashboard for the 17 Google Forms responses with distribution pie charts and qualitative story cards.
15. **15. Raw Data**: Full dataset table with 25-record pagination, text search, and raw JSON record inspection.

---

## 🛠️ Technology Stack & Architecture

- **Core Framework**: React 18 + TypeScript 5 + Vite 5
- **Styling**: Tailwind CSS v3 with Google-inspired design tokens
- **Data Visualizations**: Recharts (`BarChart`, `PieChart`, `ResponsiveContainer`, `Cell`, `Tooltip`, `Legend`)
- **Icons**: Lucide React Icons (`lucide-react`)
- **State Management**: React state hooks with global source filtering (`all`, `play_store`, `reddit`, `google_search`, `user_survey`).

---

## 📁 Directory Structure

```
memory-search-intelligence/
├── src/
│   ├── components/
│   │   ├── Sidebar.tsx             # 15-page navigation sidebar
│   │   ├── Header.tsx              # Top bar with global source filter
│   │   ├── EvidenceModal.tsx       # Record detail inspector modal
│   │   └── ...
│   ├── data/
│   │   ├── normalized_research_data.json  # 2,535 normalized research records
│   │   └── dataLoader.ts                  # Analytics aggregation & data engine
│   ├── pages/                      # 15 dedicated page components
│   │   ├── OverviewPage.tsx
│   │   ├── SourcesPage.tsx
│   │   ├── WhatUsersRememberPage.tsx
│   │   ├── WhatUsersForgetPage.tsx
│   │   ├── SearchBehaviorPage.tsx
│   │   ├── RetrievalProblemsPage.tsx
│   │   ├── UserScenariosPage.tsx
│   │   ├── KeyInsightsPage.tsx
│   │   ├── ProblemClustersPage.tsx
│   │   ├── RootCausesPage.tsx
│   │   ├── OpportunityAreasPage.tsx
│   │   ├── MvpHypothesesPage.tsx
│   │   ├── EvidenceExplorerPage.tsx
│   │   ├── SurveyResultsPage.tsx
│   │   └── RawDataPage.tsx
│   ├── types.ts                    # TypeScript interfaces & data contracts
│   ├── App.tsx                     # Main layout & router container
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Tailwind CSS directives
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 📄 License & Attribution

Created for the **Google Photos Product Manager Assignment**. Grounded exclusively in publicly available Play Store reviews, Reddit discussions, SERP snippets, and primary user surveys.
