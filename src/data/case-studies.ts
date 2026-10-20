export interface CaseStudy {
  headline: string;
  summary: string;
  problem: string;
  approach: string;
  deliverables: { title: string; text: string }[];
  stack: { layer: string; tools: string; purpose: string }[];
  stages: { title: string; text: string; artifact: string }[];
  decisions: { title: string; text: string }[];
  checks: { title: string; text: string }[];
  limits: string;
  next: string[];
  references: { title: string; url: string }[];
}

export const caseStudies: Record<string, CaseStudy> = {
  "pathology-diagnostics": {
    headline: "From a scan to a region worth reviewing.",
    summary:
      "A pathology workflow that connects image preparation, pixel-level segmentation, and a readable interpretation layer. The emphasis is on showing where a model is looking and keeping that spatial evidence attached to the report.",
    problem:
      "A label alone hides the part of a scan that influenced a prediction. For a useful review workflow, the image, its segmented regions, and the accompanying explanation need to stay connected. Different image dimensions and preprocessing choices also make it easy for an overlay to drift away from its original coordinates.",
    approach:
      "The implementation notes describe a React interface backed by Django REST framework, a PyTorch image-processing path, and PostgreSQL accessed through Django ORM. The segmentation component uses the U-Net family, with nnU-Net identified in the resume. A separate Groq / Llama 3 Vision integration provides a route from visual evidence to a readable narrative. Segmentation and language generation are distinct responsibilities: an explanation is not a second measurement of the image.",
    deliverables: [
      {
        title: "Spatial output",
        text: "A segmentation mask linked to its source image, so the result can be inspected as an overlay rather than reduced to a single label.",
      },
      {
        title: "Readable interpretation",
        text: "A report layer that communicates the image context and model output in an accessible form, without replacing the underlying evidence.",
      },
      {
        title: "Separated model boundary",
        text: "A frontend–API–model structure that keeps the review interface independent of the segmentation implementation.",
      },
    ],
    stack: [
      {
        layer: "Interface",
        tools: "React · Vite · Bun",
        purpose: "Image selection, overlay review, and report presentation.",
      },
      {
        layer: "Application API",
        tools: "Django · Django REST framework",
        purpose:
          "Request handling and a consistent boundary between the interface and processing code.",
      },
      {
        layer: "Image processing",
        tools: "PyTorch · Torchvision · NumPy · Pillow",
        purpose:
          "Decoding, tensor preparation, and segmentation output handling.",
      },
      {
        layer: "Interpretation",
        tools: "Groq API · Llama 3 Vision",
        purpose: "A separate language layer for contextual explanation.",
      },
      {
        layer: "Persistence",
        tools: "PostgreSQL · Django ORM · Docker",
        purpose:
          "Relational records and a reproducible local database environment.",
      },
    ],
    stages: [
      {
        title: "Decode",
        text: "Read the uploaded image and establish dimensions, channel order, and the original coordinate frame.",
        artifact: "Image + dimensions",
      },
      {
        title: "Prepare",
        text: "Convert the image into the representation expected by the segmentation path; retain the mapping back to the source.",
        artifact: "Prepared tensor",
      },
      {
        title: "Segment",
        text: "Use the U-Net / nnU-Net processing path to produce a pixel-level region map.",
        artifact: "Segmentation mask",
      },
      {
        title: "Reconcile",
        text: "Place the mask back over the original image so the visual result can be reviewed in context.",
        artifact: "Aligned overlay",
      },
      {
        title: "Interpret",
        text: "Keep narrative generation separate from the mask, with the image context and segmentation output as evidence.",
        artifact: "Review narrative",
      },
      {
        title: "Review",
        text: "Present the source, overlay, and explanation together rather than treating the generated text as a standalone diagnosis.",
        artifact: "Review workspace",
      },
    ],
    decisions: [
      {
        title: "Segmentation before explanation",
        text: "The core representation is spatial. An overlay makes it possible to ask which region was selected; language then explains the output. Reversing that order risks producing confident prose with no inspectable spatial basis.",
      },
      {
        title: "Coordinates are part of the contract",
        text: "Resizing is not just a display choice. A mask generated at one resolution must be mapped back consistently before it can be compared with the original scan. The review view therefore needs the source dimensions as well as the derived mask.",
      },
      {
        title: "Model changes should not redraw the product",
        text: "Keeping image preparation, inference, persistence, and presentation behind separate boundaries makes it easier to evaluate another segmentation model without rewriting the upload and review flow.",
      },
    ],
    checks: [
      {
        title: "Segmentation quality",
        text: "Evaluate overlap and boundary behavior against expert annotations on a held-out set. Report Dice / IoU by relevant subgroup rather than claiming quality from attractive overlays.",
      },
      {
        title: "Image integrity",
        text: "Check channel conversion, orientation, original-to-model coordinate mapping, and behavior on unreadable or unsupported images.",
      },
      {
        title: "Interpretation fidelity",
        text: "Compare narrative statements with the actual image and mask. An uncertain or incomplete result should remain visibly uncertain in the explanation.",
      },
    ],
    limits:
      "This is an engineering case study, not a clinically validated diagnostic product. No patient dataset, held-out evaluation, or clinical performance result is presented here. The interactive panel uses generated shapes rather than patient imagery.",
    next: [
      "Version image preparation and model artifacts together.",
      "Add an expert-review workflow with explicit disagreement capture.",
      "Evaluate on a documented held-out set before making any diagnostic performance claim.",
    ],
    references: [
      {
        title: "nnU-Net: model framework and documentation",
        url: "https://github.com/MIC-DKFZ/nnUNet",
      },
      {
        title: "Django REST framework: serializers",
        url: "https://www.django-rest-framework.org/api-guide/serializers/",
      },
    ],
  },
  "flood-mapping": {
    headline: "Turn satellite pixels into a spatial question.",
    summary:
      "A geospatial pipeline that connects raster segmentation to flood-region polygons and map-based inspection. The useful output is not just a colored image: it is a geometry that can be compared with places and infrastructure.",
    problem:
      "A flood mask only becomes operationally interpretable when its pixels have geographic meaning. Raster preparation, model output, coordinate systems, and spatial queries must agree. Cloud cover introduces another limitation for optical imagery, making the SAR pathway in the notes an important part of the design.",
    approach:
      "The notes describe DeepLabV3+ with Atrous Spatial Pyramid Pooling, a PyTorch / Rasterio / OpenCV processing stack, and a React / Mapbox GL JS interface. Django REST framework connects the processing path to PostgreSQL with PostGIS. The page explains how those pieces fit together; it does not claim a deployed live satellite feed or a measured alerting latency.",
    deliverables: [
      {
        title: "Flood-region mask",
        text: "A pixel-level representation of candidate inundated regions derived from the raster-processing path.",
      },
      {
        title: "Queryable geometry",
        text: "A route from segmentation output to geographic polygons, enabling intersection questions against other spatial features.",
      },
      {
        title: "Map-based review",
        text: "An interactive interface for interpreting the spatial output alongside geographic context.",
      },
    ],
    stack: [
      {
        layer: "Interface",
        tools: "React · Vite · Mapbox GL JS",
        purpose: "Interactive geospatial presentation and layer inspection.",
      },
      {
        layer: "Raster processing",
        tools: "Rasterio · OpenCV · NumPy",
        purpose: "Read georeferenced rasters and prepare image arrays.",
      },
      {
        layer: "Segmentation",
        tools: "PyTorch · DeepLabV3+ · ASPP",
        purpose: "Multiscale context and pixel-level flood delineation.",
      },
      {
        layer: "Application API",
        tools: "Django · Django REST framework",
        purpose: "Connect processing outputs and map-facing requests.",
      },
      {
        layer: "Spatial database",
        tools: "PostgreSQL · PostGIS",
        purpose: "Store geometries and support spatial queries.",
      },
    ],
    stages: [
      {
        title: "Read raster",
        text: "Load imagery with its coordinate reference system and geotransform instead of treating it as an unlocated picture.",
        artifact: "Raster + CRS",
      },
      {
        title: "Prepare bands",
        text: "Prepare the relevant imagery representation for the model. SAR and optical inputs require deliberate, documented handling.",
        artifact: "Model input",
      },
      {
        title: "Segment",
        text: "Apply the DeepLabV3+ pathway to delineate candidate flood regions using multiscale image context.",
        artifact: "Flood mask",
      },
      {
        title: "Vectorize",
        text: "Convert selected regions into polygons while preserving their geographic alignment.",
        artifact: "Flood polygons",
      },
      {
        title: "Intersect",
        text: "Compare flood geometries with points or other features to answer explicit spatial questions.",
        artifact: "Spatial matches",
      },
      {
        title: "Inspect",
        text: "Display the result as map layers so a reviewer can examine location, extent, and uncertainty.",
        artifact: "Map workspace",
      },
    ],
    decisions: [
      {
        title: "Multiscale context matters",
        text: "Flood boundaries occur alongside features at different scales. DeepLabV3+ combines multiscale context with a decoder that refines segmentation boundaries; the architecture is a useful match for describing both wider water extent and local edges.",
      },
      {
        title: "Keep raster and vector responsibilities distinct",
        text: "The model works with pixels, while a spatial database answers geometry questions. Treating the conversion as an explicit stage makes coordinate mistakes easier to isolate than mixing inference and map queries in one step.",
      },
      {
        title: "An intersection is not an impact assessment",
        text: "A facility inside a flood polygon is a spatial match. Its operational status, flood depth, accessibility, and actual damage require additional evidence. The interface should preserve that distinction.",
      },
    ],
    checks: [
      {
        title: "Geographic alignment",
        text: "Verify CRS consistency, raster bounds, polygon alignment, and edge cases at tile boundaries before trusting an intersection result.",
      },
      {
        title: "Segmentation evaluation",
        text: "Compare flood masks with reference annotations and separate optical and SAR evaluation conditions where appropriate.",
      },
      {
        title: "Spatial query behavior",
        text: "Test features inside, outside, and exactly on a polygon boundary. State the chosen geometric predicate rather than hiding its boundary semantics.",
      },
    ],
    limits:
      "The map below is a schematic with fictional facilities and a synthetic flood extent. It has no real coordinates, satellite feed, or emergency-use claim. Real-time operation and model quality require dated imagery, evaluation data, and measured end-to-end latency.",
    next: [
      "Record imagery acquisition time and coordinate provenance with each run.",
      "Evaluate segmentation across distinct geography and acquisition conditions.",
      "Add reference datasets and measured latency before describing live response capability.",
    ],
    references: [
      {
        title: "DeepLabV3+ research paper",
        url: "https://arxiv.org/abs/1802.02611",
      },
      {
        title: "PostGIS: ST_Intersects",
        url: "https://postgis.net/docs/ST_Intersects.html",
      },
    ],
  },
  "intelligent-etl": {
    headline: "Make messy inputs explain their structure.",
    summary:
      "A data-engineering workflow that combines deterministic cleaning with Llama 3-assisted schema reasoning. The focus is on preserving lineage while moving fragmented inputs toward reviewable relational structures and exportable reports.",
    problem:
      "Unstructured and inconsistent data creates several different problems at once: repeated records, ambiguous fields, mixed types, and relationships hidden inside flat files. A useful pipeline has to distinguish these problems. Removing duplicate rows does not establish a relational schema, and a plausible model-generated schema does not establish data integrity.",
    approach:
      "The notes place Python, Pandas, and NumPy at the processing core, with Llama 3 used for reasoning about fragmented input. React / Vite provides the interface, Django REST framework provides the application boundary, and openpyxl / ReportLab provide export paths. The resume describes a staging-to-production structure with Django ORM and data lineage. The case study expands the rationale behind those boundaries without inventing processed-volume or speed claims.",
    deliverables: [
      {
        title: "Clean staging data",
        text: "A deterministic preparation stage for standardization, duplicate handling, and explicitly rejected records.",
      },
      {
        title: "Relational structure",
        text: "A schema reasoning path that makes candidate entities, keys, and relationships available for review.",
      },
      {
        title: "Downstream artifacts",
        text: "Excel and PDF reporting paths that make the transformation understandable beyond the application interface.",
      },
    ],
    stack: [
      {
        layer: "Interface",
        tools: "React · Vite · Bun",
        purpose: "Dataset review, processing state, and export access.",
      },
      {
        layer: "Preparation",
        tools: "Python · Pandas · NumPy",
        purpose: "Vectorized cleaning and structured data manipulation.",
      },
      {
        layer: "Schema reasoning",
        tools: "Llama 3",
        purpose:
          "Interpret ambiguous input structure and propose relational organization.",
      },
      {
        layer: "Application / storage",
        tools: "Django · DRF · Django ORM",
        purpose:
          "Separate staging, application validation, and persisted records.",
      },
      {
        layer: "Exports",
        tools: "openpyxl · ReportLab",
        purpose: "Produce spreadsheet outputs and readable PDF reports.",
      },
    ],
    stages: [
      {
        title: "Ingest",
        text: "Keep the source input and its identity so later output can be traced back to an original record.",
        artifact: "Source records",
      },
      {
        title: "Profile",
        text: "Inspect fields, missing values, repeated values, and mixed types before selecting transformations.",
        artifact: "Field profile",
      },
      {
        title: "Clean",
        text: "Apply explicit cleaning and duplicate rules; retain rejected records with a reason rather than silently losing them.",
        artifact: "Staging records",
      },
      {
        title: "Structure",
        text: "Use the reasoning layer to propose entities and relationships, then review candidate keys and dependencies.",
        artifact: "Candidate schema",
      },
      {
        title: "Validate",
        text: "Check constraints and relationships before promoting records through the ORM-backed persistence path.",
        artifact: "Validated records",
      },
      {
        title: "Export",
        text: "Present the resulting structure and transformation summary through spreadsheet and PDF artifacts.",
        artifact: "Excel / PDF",
      },
    ],
    decisions: [
      {
        title: "Use models for ambiguity, rules for guarantees",
        text: "A language model can propose a field meaning or table relationship. Required fields, key uniqueness, data types, and referential integrity need deterministic checks. Keeping these roles separate makes a plausible-looking schema easier to challenge.",
      },
      {
        title: "Normalization is more than deduplication",
        text: "Third normal form concerns dependencies between attributes. Repeated rows are a separate data-quality problem. The illustrated customer–order split shows how a relationship can be made explicit; it is not proof that an arbitrary dataset has been normalized automatically.",
      },
      {
        title: "Preserve the rejected path",
        text: "A clean output is only useful if missing and rejected input can be accounted for. Keeping source identifiers and rejection reasons supports reconciliation and explains why output record counts differ from input counts.",
      },
    ],
    checks: [
      {
        title: "Record reconciliation",
        text: "Reconcile input, accepted, duplicate, and rejected counts. Test that repeated runs do not unexpectedly create new copies of already accepted records.",
      },
      {
        title: "Schema integrity",
        text: "Test keys, foreign-key relationships, null rules, and type constraints independently of model-generated explanations.",
      },
      {
        title: "Export fidelity",
        text: "Compare exported rows and summaries with the validated dataset, including Unicode, missing fields, and values that spreadsheet software may interpret as formulas.",
      },
    ],
    limits:
      "The interactive example uses a small fictional order dataset and deterministic browser-side transformations. It does not call Llama 3, Django, or an export service. No throughput, cost, or data-quality benchmark is claimed.",
    next: [
      "Capture explicit schema-review decisions and transformation versions.",
      "Add repeat-run and constraint tests against a real staging database.",
      "Benchmark time and memory using a documented dataset and reproducible workload.",
    ],
    references: [
      {
        title: "Pandas: duplicate-row handling",
        url: "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.drop_duplicates.html",
      },
      {
        title: "Django REST framework: validation",
        url: "https://www.django-rest-framework.org/api-guide/serializers/",
      },
    ],
  },
  "security-analytics": {
    headline: "Keep the evidence attached to the alert.",
    summary:
      "A security-analysis workflow that parses fragmented logs into consistent events, adds contextual enrichment, and turns the evidence into an analyst-readable report. Structured fields remain inspectable underneath the narrative.",
    problem:
      "Logs from different sources use different formats for similar events. Before an analyst can compare activity, fields such as timestamp, source address, and status need a consistent representation. Adding a language layer too early can obscure parsing errors or make a thin signal sound more decisive than it is.",
    approach:
      "The notes describe Python / Regex / Pandas for the core processing logic, a Django REST framework backend, and a React / Vite interface. Groq / Llama 3 provides the reasoning integration, IP-API supplies geographic enrichment, and ReportLab supports report output. The pipeline keeps extraction, context, and interpretation as separate steps so a reviewer can return to the original event.",
    deliverables: [
      {
        title: "Consistent event records",
        text: "A shared structure for source address, timestamp, status, and original evidence across fragmented input logs.",
      },
      {
        title: "Contextual analysis",
        text: "A reasoning and enrichment layer that helps organize suspicious patterns for analyst review.",
      },
      {
        title: "Readable audit output",
        text: "A report path that connects findings with supporting events rather than providing an unexplained score.",
      },
    ],
    stack: [
      {
        layer: "Core processing",
        tools: "Python · Regex · Pandas",
        purpose: "Extract and organize structured fields from raw log records.",
      },
      {
        layer: "Interface",
        tools: "React · Vite",
        purpose: "Review records, context, and narrative output.",
      },
      {
        layer: "Application API",
        tools: "Django · Django REST framework",
        purpose: "Separate input handling from analysis and reporting.",
      },
      {
        layer: "Reasoning / enrichment",
        tools: "Groq API · Llama 3 · IP-API",
        purpose: "Narrative context and IP geographic enrichment.",
      },
      {
        layer: "Reports",
        tools: "ReportLab",
        purpose: "Package analyst-readable PDF output.",
      },
    ],
    stages: [
      {
        title: "Collect",
        text: "Retain raw log lines and their source so each normalized event has an evidence trail.",
        artifact: "Raw events",
      },
      {
        title: "Parse",
        text: "Use source-aware patterns to extract timestamp, address, status, and other available fields.",
        artifact: "Parsed fields",
      },
      {
        title: "Normalize",
        text: "Map parsed fields to a consistent event shape; keep failures visible instead of forcing a match.",
        artifact: "Event schema",
      },
      {
        title: "Enrich",
        text: "Add external context where appropriate, with geographic lookup separate from the original event facts.",
        artifact: "Context records",
      },
      {
        title: "Interpret",
        text: "Use the reasoning layer to summarize relevant patterns with references back to the supporting events.",
        artifact: "Analyst narrative",
      },
      {
        title: "Report",
        text: "Present findings and evidence together in the interface and reporting path.",
        artifact: "Audit report",
      },
    ],
    decisions: [
      {
        title: "Parse before asking for a narrative",
        text: "Deterministic extraction makes a report auditable. An address, timestamp, or status can be checked against a raw line; an unsupported model assertion cannot. Unknown formats should be surfaced for review rather than silently classified.",
      },
      {
        title: "Enrichment is context, not attribution",
        text: "An IP lookup describes a network address, not the identity or physical location of an attacker. Enrichment can also be missing or stale. The report should preserve those limits instead of turning geographic context into certainty.",
      },
      {
        title: "Suspicious is not confirmed malicious",
        text: "Repeated authentication failures and unusual statuses can be useful review signals, but they have benign explanations too. A defensible workflow keeps event evidence, detection logic, and an analyst decision separate.",
      },
    ],
    checks: [
      {
        title: "Parser robustness",
        text: "Test malformed lines, new source formats, time-zone handling, escaping, and missing fields. Preserve the raw input when extraction fails.",
      },
      {
        title: "Signal evaluation",
        text: "Evaluate candidate detections against labeled benign and malicious scenarios; report false-positive behavior as well as detected cases.",
      },
      {
        title: "Evidence and data handling",
        text: "Check that report statements can be traced to events and that secrets or unrelated personal data do not leak into enrichment requests or exported reports.",
      },
    ],
    limits:
      "The walkthrough uses fictional log lines and reserved example addresses. Its chart counts sample events; it is not a threat score or a measured detection rate. No live IP lookups or model calls are made from this portfolio.",
    next: [
      "Version parser patterns and retain source-specific test fixtures.",
      "Evaluate candidate detections against labeled scenarios before reporting accuracy.",
      "Add explicit retention, redaction, and external-enrichment controls to a hosted workflow.",
    ],
    references: [
      {
        title: "OWASP: application logging guidance",
        url: "https://cheatsheetseries.owasp.org/cheatsheets/Logging_Cheat_Sheet.html",
      },
      {
        title: "Django REST framework: serializers",
        url: "https://www.django-rest-framework.org/api-guide/serializers/",
      },
    ],
  },
};
