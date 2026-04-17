import type { AlgorithmNode, NodeOption, NodeType } from "../types/algorithm";

export type Language = "pt" | "en";

export const languageStorageKey = "dr-ai-ackerman-language";

const uiTranslations = {
  pt: {
    nav_home: "Início",
    nav_tree_map: "Mapa da árvore",
    nav_search: "Buscar",
    header_tagline: "Plataforma de navegação diagnóstica em dermatopatologia utilizando método algorítmico",
    language_portuguese: "Português",
    language_english: "English",
    brand_kicker: "Dermatopatologia algorítmica",
    home_title: "DermPath Navigator",
    home_subtitle: "Apoio visual ao raciocínio diagnóstico em dermatopatologia pelo método algorítmico.",
    home_hero_heading: "Um caminho mais claro até o diagnóstico.",
    home_hero_body:
      "Navegue por uma árvore diagnóstica visual, objetiva e organizada para apoiar a leitura do HE sem transformar a experiência em um painel técnico.",
    home_start: "Iniciar diagnóstico",
    home_tree_map: "Mapa da árvore",
    home_quiz: "Quiz",
    home_search: "Buscar",
    home_card_start_body: "Siga o fluxo morfológico por meio de imagens ilustradas até o desfecho mais provável.",
    home_card_tree_map_body: "Visualize a estrutura geral da árvore diagnóstica",
    home_card_quiz_body: "Acesse o módulo Quiz utilizando o método algorítmico para revisar conteúdos do aplicativo de forma guiada.",
    home_about_kicker: "Sobre o método",
    home_about_title: "Leitura organizada, sem excesso de ruído.",
    home_about_body:
      "A proposta é oferecer uma primeira etapa de orientação visual e morfológica: quando o HE fecha uma entidade, isso aparece de forma direta; quando não fecha, o sistema assume isso com clareza como terminal morfológico.",
    author_section_title: "Sobre o Autor",
    author_section_body:
      "Rafael de Deus Moura é médico patologista e dermatopatologista. Graduado em Medicina pela Universidade Federal do Piauí, realizou Residência Médica em Patologia na Faculdade de Medicina da Universidade de São Paulo, onde também concluiu Doutorado em Ciências. É especialista em Anatomia Patológica pela SBP/AMB, especialista em Dermatopatologia pelo International Board Certifying Examination in Dermatopathology, professor do Curso de Medicina da Universidade Federal do Piauí e associado colaborador da Sociedade Brasileira de Dermatologia (SBD).",
    author_lattes_label: "Currículo Lattes:",
    author_welcome_video: "Vídeo de Boas Vindas",
    layout_brand: "Dermatopatologia algorítmica",
    diagnostic_title: "árvore diagnóstica",
    diagnostic_subtitle:
      "Navegue pela lógica morfológica até um diagnóstico específico, grupo diagnóstico ou terminal morfológico.",
    restart: "Reiniciar",
    search_title: "Buscar",
    search_subtitle: "Encontre diagnósticos, padrões morfológicos, palavras-chave e sinônimos em toda a árvore.",
    overview_title: "Mapa da árvore",
    overview_subtitle: "Visualização navegável da estrutura diagnóstica já implementada.",
    tree_map_focus_subtitle: "Visualize o caminho morfológico atual e seus desdobramentos de forma expandida.",
    tree_map_current_path: "Caminho atual",
    breadcrumb_aria: "breadcrumb",
    search_panel_kicker: "Busca",
    search_panel_title: "Diagnósticos, padrões e sinônimos",
    search_panel_label: "Buscar na árvore",
    search_panel_placeholder: "Ex.: amiloidose maculosa, vasculite, mucina, líquen...",
    search_empty_query: "Digite um termo para pesquisar na árvore.",
    search_empty_results: "Nenhum resultado encontrado para esta busca.",
    favorites_kicker: "Favoritos",
    favorites_title: "Atalhos pessoais",
    favorites_empty: "Você ainda não favoritou nós. Use a estrela dos resultados finais para montar sua lista.",
    next_decision: "Próxima decisão",
    no_children: "Este nó não possui desdobramentos adicionais.",
    advance: "Avançar",
    final_result: "Resultado final",
    diagnostic_possibilities: "Possibilidades diagnósticas",
    diagnostic_pathway: "Caminho diagnóstico",
    back: "Voltar",
    copy_path: "Copiar caminho",
    export_text: "Exportar texto",
    open: "Abrir",
    special_content: "Conteúdo especial",
    teaching_content: "Conteúdo didático",
    understand_better: "ENTENDA MELHOR",
    histopathology: "Histopatológico",
    gold_tips: "DICAS QUE VALEM OURO",
    gold_tips_lupus_classification: "Dicas que Valem Ouro: Classificação do Lúpus Cutâneo",
    return_to_diagnosis: "Voltar ao diagnóstico",
    didactic_slide: "Lâmina didática",
    didactic_slides: "Lâminas didáticas",
    microscopic_description: "DESCRIÇÃO MICROSCÓPICA",
    microscopic_description_kicker: "Descrição microscópica",
    premium_lesson: "Aula premium",
    specialist_tips: "Dicas de especialista",
    specialist_insight: "Insight de especialista",
    expert_content: "Entenda melhor",
    tree_expand: "Expandir",
    tree_collapse: "Recolher",
  },
  en: {
    nav_home: "Home",
    nav_tree_map: "Tree map",
    nav_search: "Search",
    header_tagline: "Diagnostic navigation platform in dermatopathology using an algorithmic method",
    language_portuguese: "Português",
    language_english: "English",
    brand_kicker: "Algorithmic dermatopathology",
    home_title: "DermPath Navigator",
    home_subtitle: "Visual support for diagnostic reasoning in dermatopathology through the algorithmic method.",
    home_hero_heading: "A clearer path to diagnosis.",
    home_hero_body:
      "Navigate through a visual, objective, and organized diagnostic tree to support H&E interpretation without turning the experience into a technical panel.",
    home_start: "Start diagnosis",
    home_tree_map: "Tree map",
    home_quiz: "Quiz",
    home_search: "Search",
    home_card_start_body: "Follow the morphologic flow through illustrated images to the most likely outcome.",
    home_card_tree_map_body: "View the overall structure of the diagnostic tree.",
    home_card_quiz_body: "Access the Quiz module using the algorithmic method to review app content in a guided way.",
    home_about_kicker: "About the method",
    home_about_title: "Organized reading, without excess noise.",
    home_about_body:
      "The proposal is to offer an initial stage of visual and morphologic guidance: when H&E closes an entity, it appears directly; when it does not, the system states this clearly as a morphologic terminal.",
    author_section_title: "About the Author",
    author_section_body:
      "Rafael de Deus Moura is a pathologist and dermatopathologist. He graduated in Medicine from the Federal University of Piauí and completed his residency in Pathology at the Faculty of Medicine of the University of São Paulo, where he also earned his PhD in Science. He is a specialist in Anatomic Pathology certified by SBP/AMB, a specialist in Dermatopathology certified by the International Board Certifying Examination in Dermatopathology, a professor at the Federal University of Piauí Medical School, and a collaborating associate of the Brazilian Society of Dermatology (SBD).",
    author_lattes_label: "Lattes CV:",
    author_welcome_video: "Welcome Video",
    layout_brand: "Algorithmic dermatopathology",
    diagnostic_title: "Diagnostic tree",
    diagnostic_subtitle:
      "Navigate through morphologic logic toward a specific diagnosis, diagnostic group, or morphologic terminal.",
    restart: "Restart",
    search_title: "Search",
    search_subtitle: "Find diagnoses, morphologic patterns, keywords, and synonyms throughout the tree.",
    overview_title: "Tree map",
    overview_subtitle: "Navigable view of the diagnostic structure already implemented.",
    tree_map_focus_subtitle: "View the current morphologic pathway and its downstream branches in an expanded map.",
    tree_map_current_path: "Current path",
    breadcrumb_aria: "breadcrumb",
    search_panel_kicker: "Search",
    search_panel_title: "Diagnoses, patterns, and synonyms",
    search_panel_label: "Search the tree",
    search_panel_placeholder: "Ex.: macular amyloidosis, vasculitis, mucin, lichen...",
    search_empty_query: "Type a term to search the tree.",
    search_empty_results: "No results found for this search.",
    favorites_kicker: "Favorites",
    favorites_title: "Personal shortcuts",
    favorites_empty: "You have not favorited any nodes yet. Use the star on final results to build your list.",
    next_decision: "Next decision",
    no_children: "This node has no additional branches.",
    advance: "Next",
    final_result: "Final result",
    diagnostic_possibilities: "Diagnostic possibilities",
    diagnostic_pathway: "Diagnostic pathway",
    back: "Back",
    copy_path: "Copy path",
    export_text: "Export text",
    open: "Open",
    special_content: "Special content",
    teaching_content: "Didactic content",
    understand_better: "UNDERSTAND BETTER",
    histopathology: "Histopathology",
    gold_tips: "GOLDEN TIPS",
    gold_tips_lupus_classification: "Golden Tips: Cutaneous Lupus Classification",
    return_to_diagnosis: "Back to diagnosis",
    didactic_slide: "Teaching slide",
    didactic_slides: "Teaching slides",
    microscopic_description: "MICROSCOPIC DESCRIPTION",
    microscopic_description_kicker: "Microscopic description",
    premium_lesson: "Premium lesson",
    specialist_tips: "Specialist tips",
    specialist_insight: "Specialist insight",
    expert_content: "Understand better",
    tree_expand: "Expand",
    tree_collapse: "Collapse",
  },
} as const;

const exactTextTranslations: Record<string, string> = {
  "Resumo Lúpus Cutâneo": "Cutaneous Lupus Summary",
  "visão de apoio para consolidar classificação, padrões clínicos e lesões inespec?ficas relacionadas ao Lúpus.":
    "Supportive overview to consolidate classification, clinical patterns, and nonspecific lesions related to lupus.",
  "classificação do Lúpus cutâneo": "Classification of cutaneous lupus",
  "lesões inespec?ficas do Lúpus": "Nonspecific lupus lesions",
  "Outras lesões inespec?ficas": "Other nonspecific lesions",
  "Mucinose p?pulo-nodular": "Papulonodular mucinosis",
  "Lúpus eritematoso cutâneo agudo": "Acute cutaneous lupus erythematosus",
  "Lúpus eritematoso cutâneo subagudo": "Subacute cutaneous lupus erythematosus",
  "Lúpus eritematoso cutâneo cr?nico": "Chronic cutaneous lupus erythematosus",
  "classificação da Ros?cea": "Rosacea Classification",
  "Resumo didático para Revisão r?pida dos principais padrões histopatológicos e desdobramentos clínicos.":
    "Didactic summary for quick review of the main histopathologic patterns and clinical manifestations.",
  "Histopatológico: Pitiríase rubra pilar": "Histopathology ? Pityriasis rubra pilaris",
  "visualização ampliada da imagem histopatológica, com foco total no conteúdo principal.":
    "Enlarged view of the histopathologic image, with full focus on the main content.",
  "Trata-se de pele com epiderme exibindo hiperplasia psoriasiforme e altern?ncia de orto e paraceratose horizontal e verticalmente (padrão em \"tabuleiro de xadrez\"). Em derme superficial, h? leve infiltrado linfocitário perivascular. Os achados são consistente com Pitiríase Rubra Pilar.":
    'This is skin with epidermis showing psoriasiform hyperplasia and alternating ortho- and parakeratosis horizontally and vertically (a "checkerboard" pattern). In the superficial dermis, there is a mild perivascular lymphocytic infiltrate. The findings are consistent with Pityriasis Rubra Pilaris.',
  "Histopatológico: Dermatite Neutrofílica e Granulomatosa de Paliçada":
    "Histopathology ? Palisaded Neutrophilic and Granulomatous Dermatitis",
  "visualização ampliada das 8 imagens histopatológicas, com foco em leitura confortável e detalhada.":
    "Enlarged display of the 8 histopathologic images, focused on comfortable and detailed reading.",
  "Trata-se de biópsia de pele com epiderme sem alterações histológicas significativas. Em derme superficial e profunda, nota-se moderado infiltrado neutrofílico, de padrão intersticial, com degeneração do colágeno e depósitos de mucina. A pesquisa de micobactérias, através da coloração de Fite-Faraco, resultou negativa. Os achados são compatíveis com Dermatite Neutrofílica e Granulomatosa de Paliçada, padrão histopatológico relacionado a colagenoses, medicamentos, infecções, dentre outras.":
    "This is a skin biopsy with epidermis showing no significant histologic changes. In the superficial and deep dermis, there is a moderate neutrophilic infiltrate with an interstitial pattern, collagen degeneration, and mucin deposits. The search for mycobacteria using Fite-Faraco stain was negative. The findings are compatible with Palisaded Neutrophilic and Granulomatous Dermatitis, a histopathologic pattern related to collagen vascular diseases, medications, infections, among others.",
  "Dermatite Neutrofílica e Granulomatosa de Paliçada":
    "Palisaded Neutrophilic and Granulomatous Dermatitis",
  "Dermatite Neutrofílica e Granulomatosa de Paliçada (Dermatite Granulomatosa Intersticial com Cordões e Artrite)":
    "Palisaded Neutrophilic and Granulomatous Dermatitis (Interstitial Granulomatous Dermatitis with Cords and Arthritis)",
  "Clinicamente se apresenta como pápulas umbilicadas ou lesões infiltradas e mais lineares, formando cordões clinicamente.":
    "Clinically, it presents as umbilicated papules or more linear infiltrated lesions, forming cord-like plaques.",
  "No início é uma dermatite neutrofílica, com neutrófilos íntegros e fragmentados (lembrando síndrome de Sweet), podendo ter vasculite.":
    "Initially, it is a neutrophilic dermatitis, with intact and fragmented neutrophils (resembling Sweet syndrome), and vasculitis may be present.",
  "Depois faz uma dermatite granulomatosa intersticial (\"dermatite granulomatosa intersticial com cordões e artrite\"), lembrando o granuloma anular. Mas geralmente o infiltrado é mais profundo, na derme reticular (GA tende a ser mais superficial, com focos de paliçada em torno de colágeno alterado com mucina). Presença de \"floating sign\" (sinal da flutuação) ou pseudo-rosetas histiocíticas.":
    'It then evolves into an interstitial granulomatous dermatitis ("interstitial granulomatous dermatitis with cords and arthritis"), resembling granuloma annulare. However, the infiltrate is usually deeper, in the reticular dermis (GA tends to be more superficial, with palisaded foci around altered collagen with mucin). Presence of the "floating sign" or histiocytic pseudo-rosettes.',
  "Fase final é mais fibrótica, lembrando necrobiose lipoídica.":
    "The final phase is more fibrotic, resembling necrobiosis lipoidica.",
  "Est? relacionada a Doenças sist?micas com depósitos de imunocomplexos":
    "It is related to systemic diseases with immune-complex deposition",
  "Vasculites prim?rias (Doença de Wegener e de Churg-Strauss - Granulomatose com Poliangiite e Granulomatose com Poliangiite e Eosinofilia).":
    "Primary vasculitides (Wegener disease and Churg-Strauss disease - Granulomatosis with Polyangiitis and Eosinophilic Granulomatosis with Polyangiitis).",
  "Artrite Reumatoide e Lúpus Eritematoso.": "Rheumatoid Arthritis and Lupus Erythematosus.",
  "Neoplasias.": "Neoplasms.",
  "infecções (ex. Borreliose)": "Infections (e.g. borreliosis).",
  "Farmacodermias (\"Dermatite granulomatosa intersticial secundária a F?rmacos\").":
    'Drug eruptions ("drug-induced interstitial granulomatous dermatitis").',
  "Lúpus eritematoso cutâneo ? dividido em agudo, subagudo e cr?nico. não tem rela?ão com a dura?ão da Doença. Essa terminologia est? ligada ? probabilidade desse Lúpus cutâneo estar associado a Lúpus sist?mico.":
    "Cutaneous lupus erythematosus is divided into acute, subacute, and chronic. It is not related to disease duration. This terminology is linked to the probability that this cutaneous lupus is associated with systemic lupus.",
  "lesões bem ef?meras, rash malar, eritema no dorso das m?os.":
    "Very fleeting lesions, malar rash, erythema on the backs of the hands.",
  "90% de chance de estar associado a Lúpus sist?mico.":
    "90% chance of being associated with systemic lupus.",
  "2 tipos principais.": "2 main types.",
  "Lesão polic?clica anular em face anterior de t?rax, ombro, dorso e rosto. Mais ativa na periferia.":
    "Annular polycyclic lesion on the anterior chest, shoulder, back, and face. More active at the periphery.",
  "Lesão psoriasiforme, igualzinha a psoríase, mas s? em ?reas fotoexpostas.":
    "Psoriasiform lesion, very similar to psoriasis, but only in photoexposed areas.",
  "não deixa atrofia. Marcada fotossensibilidade.":
    "Does not leave atrophy. Marked photosensitivity.",
  "Cerca de 50% de chance de estar associado a Lúpus sist?mico.":
    "About a 50% chance of being associated with systemic lupus.",
  "Lúpus discoide, tipo localizado, apenas no polo cef?lico, com 5% de associa?ão com Lúpus sist?mico; e tipo generalizado, presente em 2 segmentos corporais, saindo do polo cef?lico, com 15% de associa?ão.":
    "Discoid lupus, localized type, only in the cephalic pole, with 5% association with systemic lupus; and generalized type, present in 2 body segments beyond the cephalic pole, with 15% association.",
  "Geralmente epiderme muito atr?fica, espessamento de membrana basal e alop?cia em couro cabeludo.":
    "Usually very atrophic epidermis, basement membrane thickening, and scalp alopecia.",
  "Lúpus t?mido: subtipo de Lúpus discoide sem acometimento da epiderme.":
    "Tumid lupus: a subtype of discoid lupus without epidermal involvement.",
  "Paniculite l?pica: 3 topografias cl?ssicas, rosto, ombro e n?degas.":
    "Lupus panniculitis: 3 classic sites, face, shoulder, and buttocks.",
  "Paniculite l?pica: ocorre de forma isolada, com acometimento apenas de hipoderme.":
    "Lupus panniculitis: may occur in isolation, involving only the hypodermis.",
  "Lúpus profundo: associado a altera?ões de Lúpus na pele sobrejacente.":
    "Lupus profundus: associated with lupus changes in the overlying skin.",
  "Associadas ao Lúpus, geralmente denotam que esse Lúpus est? em atividade. Mas não são espec?ficas do Lúpus.":
    "Associated with lupus, they usually indicate that lupus is active. However, they are not specific to lupus.",
  "Ac?mulo de mucina na derme.": "Mucin accumulation in the dermis.",
  "Sem infiltrado inflamatério.": "No inflammatory infiltrate.",
  "Vacuoliza?ão.": "Vacuolization.",
  "Espessamento de membrana basal.": "Basement membrane thickening.",
  "Esclerose de parede de vasos.": "Sclerosis of vessel walls.",
  "Eritema nodoso.": "Erythema nodosum.",
  "Vasculite leucocitocl?stica.": "Leukocytoclastic vasculitis.",
  "Geralmente no t?rax.": "Usually on the chest.",
  "pápulas eritematosas em arranjo reticulado.": "Erythematous papules in a reticulated arrangement.",
  "Ackerman considerava uma manifesta?ão do Lúpus.": "Ackerman considered it a manifestation of lupus.",
  "Pode ter altera?ões espec?ficas do Lúpus, como alteração de interface.":
    "It may show lupus-specific changes, such as interface alteration.",
  "Ros?cea granulomatosa": "Granulomatous rosacea",
  "Ros?cea eritemato-telangiect?sica": "Erythematotelangiectatic rosacea",
  "Infiltrado linfoplasmocitário em torno de vasos telangiect?sicos.":
    "Lymphoplasmacytic infiltrate around telangiectatic vessels.",
  "Foliculite p?pulo-pustulosa": "Papulopustular folliculitis",
  "Foliculite espongiótica que progride para supurativa.":
    "Spongiotic folliculitis progressing to suppurative folliculitis.",
  "Foliculite granulomatosa": "Granulomatous folliculitis",
  "O fol?culo rompe.": "The follicle ruptures.",
  "Procurar Demodex em todo e qualquer infund?bulo, j? que a ros?cea pode melhorar com tratamento.":
    "Look for Demodex in every infundibulum, since rosacea may improve with treatment.",
  "Doença de longa dura?ão pode resultar em rinofima.":
    "Long-standing disease may result in rhinophyma.",
  "Forma grave relacionada": "Related severe form",
  "Lúpus miliar disseminado da face ? uma forma grave de acne ros?cea granulomatosa, na qual o acometimento das p?lpebras ? frequente.":
    "Disseminated lupus miliaris of the face is a severe form of granulomatous acne rosacea, in which eyelid involvement is frequent.",
  "Painel contextual": "Context panel",
  "Favorito": "Favorite",
  "Favoritar": "Add favorite",
  "Observa?ões": "Notes",
  "Refer?ncias": "References",
  "Algoritmo implementado": "Implemented algorithm",
  "Amiloidoses implementadas": "Amyloidoses implemented",
  "A navegação ? inteiramente orientada por árvore de Decisão clic?vel, sem chatbot e sem prompt livre.":
    "Navigation is entirely guided by a clickable decision tree, without chatbot and without free prompt.",
  "Ramo ainda não implementado nesta versão.": "Branch not yet implemented in this version.",
  "Espaão reservado para expansão futura.": "Reserved space for future expansion.",
  "Ramo futuro da classificação de Chapel Hill ainda não completado nesta versão.":
    "Future Chapel Hill Classification branch not yet completed in this version.",
  "Marcado intencionalmente como ramo ainda não completado nesta versão.":
    "Intentionally marked as a branch not yet completed in this version.",
  "Membrana basal espessada / interface borrada / epiderme afinada":
    "Thickened basement membrane / blurred interface / thinned epidermis",
  "Membrana basal ?s vezes espessada, interface borrada, epiderme afinada":
    "Basement membrane sometimes thickened, blurred interface, thinned epidermis",
  "Esclerose na por?ão superior da derme":
    "Sclerosis in the upper portion of the dermis",
  "Melan?fagos em derme papilar": "Melanophages in the papillary dermis",
  "Sem baloniza?ão e com poucos Queratinócitos Necróticos":
    "Without ballooning and with few necrotic keratinocytes",
  "Linfócitos predominam": "Lymphocytes predominate",
  "Dermatites vésico-bolhosas": "Vesicobullous dermatitis",
  "Dermatites pustulosas": "Pustular dermatitis",
  "Dermatites fibrosantes": "Fibrosing dermatitis",
  "Lúpus disc?ide": "Discoid lupus",
  "Dermatomiosite": "Dermatomyositis",
  "Liquenoide": "Lichenoid",
  "Interface vacuolar": "Vacuolar interface",
  "Interface liquenoide": "Lichenoid interface",
  "C?lulas de Langerhans predominam": "Langerhans cells predominate",
  "Focos discretos na derme papilar": "Discrete foci in the papillary dermis",
  "Granulomas Sarcoídicos em derme papilar e ?s vezes conflu?ncia de granulomas em derme reticular":
    "Discrete foci and sometimes confluent foci in the reticular dermis",
  "Sarcoidose": "Sarcoidosis",
  "Pitiríase versicolor": "Pityriasis versicolor",
  "padrão liquenoide com focos discretos e por vezes confluentes na derme reticular.":
    "Lichenoid pattern with discrete foci and sometimes confluent foci in the reticular dermis.",
  "padrão liquenoide com focos histiocit?rios discretos na derme papilar.":
    "Lichenoid pattern with discrete histiocytic foci in the papillary dermis.",
  "Esporos e hifas na camada córnea em padrão perivascular discreto.":
    "Spores and hyphae in the stratum corneum in a subtle perivascular pattern.",
  "Histopatológico 3": "Histopathology 3",
  "Histopatológico 4": "Histopathology 4",
  "Histopatológico 5": "Histopathology 5",
  "Histopatológico 6": "Histopathology 6",
  "Histopatológico 7": "Histopathology 7",
  "Histopatológico 8": "Histopathology 8",
  "Histopatológico 91": "Histopathology 91",
  "Histopatológico 92": "Histopathology 92",
  "Somente Linfócitos": "Lymphocytes only",
  "Linfócitos apenas": "Lymphocytes only",
  "Apenas perivascular": "Perivascular only",
  "Perivascular e intersticial": "Perivascular and interstitial",
  "Diagnósticos infecciosos e afins": "Infectious and related diagnoses",
  "Quando o fechamento não for seguro": "When the diagnosis is not secure",
};

const nodeFieldTranslationsEn: Record<
  string,
  Partial<{
    title: string;
    description: string;
    resultTitle: string;
  }>
> = {
  root: {
    title: "Pathologic process",
    description: "Choose the initial broad morphologic group.",
  },
  dermatite: {
    title: "Dermatitis",
    description: "Select the predominant inflammatory pattern.",
  },
  "dermatoses-invisiveis": {
    title: "Invisible dermatoses",
    description: "Branch not yet implemented in this version.",
  },
  perivascular: {
    title: "Perivascular dermatitis",
    description: "Classify the pattern according to the predominant epidermal change.",
  },
  "perivascular-interface": {
    title: "Interface",
    description: "Subdivide the pattern into vacuolar or lichenoid.",
  },
  "interface-vacuolar": {
    title: "Vacuolar interface",
    description: "Subdivide according to whether lymphocytes or eosinophils and neutrophils predominate.",
  },
  "interface-vac-somente-linfocitos": {
    title: "Lymphocytes predominate",
    description: "Determine whether there is ballooning and individual necrotic keratinocytes.",
  },
  "interface-vac-linf-balonizacao": {
    title: "Ballooning and individual necrotic keratinocytes",
    description: "Use the associated epidermal findings to close the algorithm.",
  },
  "interface-vac-linf-sem-balonizacao": {
    title: "No ballooning and few necrotic keratinocytes",
    description: "Use the additional findings to separate the diagnostic outcomes.",
  },
  "group-lupus-dermatomiosite-interface": {
    title: "Thickened basement membrane / blurred interface / thinned epidermis",
    resultTitle: "Thickened basement membrane / blurred interface / thinned epidermis",
    description: "At this point in the algorithm, two main possibilities remain open.",
  },
  "interface-vac-misto": {
    title: "Lymphocytes, neutrophils, and eosinophils",
    description: "Determine whether there is ballooning and individual necrotic keratinocytes.",
  },
  "interface-liquenoide": {
    title: "Lichenoid interface",
    description: "Subdivide according to whether lymphocytes, histiocytes, or Langerhans cells predominate.",
  },
  "interface-liquenoide-linfocitos": {
    title: "Lymphocytes predominate",
    description: "Use the associated epidermal and dermal findings to close the algorithm.",
  },
  "interface-liquenoide-histiocitos": {
    title: "Histiocytes predominate",
    description: "Use the topography of the histiocytic foci to close the algorithm.",
  },
  "interface-liquenoide-langerhans": {
    title: "Langerhans cells predominate",
    description: "Use the predominant cytologic features of the Langerhans cells.",
  },
  "dx-liquen-nitidus": {
    title: "Lichen nitidus",
    resultTitle: "Lichen nitidus",
    description: "Lichenoid pattern with discrete histiocytic foci in the papillary dermis.",
  },
  "dx-sarcoidose-liquenoide": {
    title: "Sarcoidosis",
    resultTitle: "Sarcoidosis",
    description: "Lichenoid pattern with discrete foci and sometimes confluent foci in the reticular dermis.",
  },
  "placeholder-neoplasia": {
    title: "Neoplasia",
    description: "Select the neoplastic group implemented in this branch.",
  },
  "neoplasia-tumores-anexiais": {
    title: "Adnexal tumors",
    description: "Classify adnexal tumors into follicular, eccrine/apocrine, or sebaceous.",
  },
  "neoplasia-anexial-foliculares": {
    title: "Follicular",
    description: "Classify follicular adnexal tumors by differentiation line.",
  },
  "neoplasia-folicular-germinativa-tricoblasto": {
    title: "Germinative (Trichoblast)",
    description: "Subdivide germinative follicular tumors into BCC or trichoblastomas.",
  },
  "neoplasia-folicular-matrical": {
    title: "Matrical",
    description: "Select the matrical diagnosis.",
  },
  "neoplasia-folicular-bainha-externa-bulbo-tronco": {
    title: "Outer root sheath of bulb / stem",
    description: "Select the diagnosis within this line of follicular differentiation.",
  },
  "neoplasia-folicular-bainha-externa-istmo": {
    title: "Outer root sheath of isthmus",
    description: "Select the diagnosis within this line of follicular differentiation.",
  },
  "neoplasia-folicular-infundibular": {
    title: "Infundibular",
    description: "Select the infundibular diagnosis.",
  },
  "neoplasia-folicular-manto": {
    title: "Mantle",
    description: "Select the diagnosis related to mantle differentiation.",
  },
  "neoplasia-folicular-panfolicular": {
    title: "Panfollicular",
    description: "Select the panfollicular diagnosis.",
  },
  "nodular-histiocitos": {
    title: "Histiocytes predominate",
    description: "Subdivide into sarcoid-like, tuberculoid, palisaded, interstitial, or suppurative.",
  },
  "pv-apenas": {
    title: "Perivascular only",
    description: "Assess the predominant inflammatory composition.",
  },
  "pv-intersticial": {
    title: "Perivascular and interstitial",
    description: "Assess the predominant composition of the infiltrate.",
  },
  "dx-schamberg-2": {
    title: "Schamberg disease",
    resultTitle: "Schamberg disease",
    description: "Predominance of lymphocytes in a perivascular and interstitial pattern compatible with Schamberg disease.",
  },
  "group-pv-neutrofilos": {
    title: "Prominent neutrophils",
    resultTitle: "Prominent neutrophils",
    description: "At this point in the algorithm, a group of possible diagnoses remains open.",
  },
  "group-pv-eosinofilos": {
    title: "Prominent eosinophils",
    resultTitle: "Prominent eosinophils",
    description: "Urticarial pattern with prominent eosinophils.",
  },
  "dx-urticaria": {
    title: "Fully developed urticaria",
    resultTitle: "Fully developed urticaria",
    description: "Neutrophils and eosinophils in a pattern compatible with fully developed urticaria.",
  },
  "dx-morfeia-precoce": {
    title: "Early morphea",
    resultTitle: "Early morphea",
    description: "Neutrophils, eosinophils, and plasma cells favor early morphea.",
  },
  "group-pv-melanofagos": {
    title: "Prominent melanophages",
    resultTitle: "Prominent melanophages",
    description: "At this point in the algorithm, two main possibilities remain open.",
  },
  "dx-estase": {
    title: "Stasis dermatitis",
    resultTitle: "Stasis dermatitis",
    description: "Prominent siderophages suggest stasis dermatitis.",
  },
};

const optionLabelTranslationsEn: Record<string, string> = {
  "root::dermatite": "Dermatitis",
  "root::placeholder-neoplasia": "Neoplasia",
  "root::placeholder-cisto": "Cyst",
  "root::deposito": "Storage disease",
  "root::placeholder-hamartoma": "Hamartoma / malformation",
  "dermatite::perivascular": "Perivascular dermatitis",
  "dermatite::nodular-difusa": "Nodular / diffuse dermatitis",
  "dermatite::vesico-bolhosa": "Vesicobullous dermatitis",
  "dermatite::vasculites": "Vasculitis",
  "dermatite::pustulosas": "Pustular dermatitis",
  "dermatite::fibrosantes": "Fibrosing dermatitis",
  "dermatite::paniculites": "Panniculitis",
  "placeholder-neoplasia::neoplasia-tumores-anexiais": "Adnexal tumors",
  "neoplasia-tumores-anexiais::neoplasia-anexial-foliculares": "Follicular",
  "neoplasia-tumores-anexiais::neoplasia-anexial-ecrinos-apocrinos": "Eccrine and apocrine",
  "neoplasia-tumores-anexiais::neoplasia-anexial-sebaceos": "Sebaceous",
  "neoplasia-anexial-foliculares::neoplasia-folicular-germinativa-tricoblasto": "Germinative (Trichoblast)",
  "neoplasia-anexial-foliculares::neoplasia-folicular-matrical": "Matrical",
  "neoplasia-anexial-foliculares::neoplasia-folicular-bainha-externa-bulbo-tronco": "Outer root sheath of bulb / stem",
  "neoplasia-anexial-foliculares::neoplasia-folicular-bainha-externa-istmo": "Outer root sheath of isthmus",
  "neoplasia-anexial-foliculares::neoplasia-folicular-infundibular": "Infundibular",
  "neoplasia-anexial-foliculares::neoplasia-folicular-manto": "Mantle",
  "neoplasia-anexial-foliculares::neoplasia-folicular-panfolicular": "Panfollicular",
  "perivascular-interface::interface-vacuolar": "Vacuolar interface",
  "perivascular-interface::interface-liquenoide": "Lichenoid interface",
  "interface-vacuolar::interface-vac-somente-linfocitos": "Lymphocytes only",
  "interface-vacuolar::interface-vac-misto": "Lymphocytes, neutrophils, and eosinophils",
  "interface-vac-somente-linfocitos::interface-vac-linf-balonizacao": "Ballooning and individual necrotic keratinocytes",
  "interface-vac-somente-linfocitos::interface-vac-linf-sem-balonizacao": "No ballooning and few necrotic keratinocytes",
  "interface-vac-linf-balonizacao::dx-eritema-multiforme": "Normal stratum corneum",
  "interface-vac-linf-balonizacao::dx-pleva": "Parakeratosis",
  "interface-vac-linf-balonizacao::dx-gvhd": "Prominent granular layer",
  "interface-vac-linf-balonizacao::dx-efeitos-interferon-mf": "Necrotic keratinocytes also in the dermal papillae",
  "interface-vac-linf-sem-balonizacao::dx-erupcao-droga-tipo-interface": "Normal stratum corneum",
  "interface-vac-linf-sem-balonizacao::group-lupus-dermatomiosite-interface":
    "Basement membrane sometimes thickened, blurred interface, thinned epidermis",
  "interface-vac-linf-sem-balonizacao::group-liquen-escleroso-api":
    "Sclerosis in the superficial dermis and melanophages in the papillary dermis",
  "interface-vac-linf-sem-balonizacao::dx-alteracao-pigmentar-pos-inflamatoria":
    "Melanophages in the papillary dermis",
  "interface-liquenoide::interface-liquenoide-linfocitos": "Lymphocytes predominate",
  "interface-liquenoide::interface-liquenoide-histiocitos": "Histiocytes predominate",
  "interface-liquenoide::interface-liquenoide-langerhans": "Langerhans cells predominate",
  "interface-liquenoide-histiocitos::dx-liquen-nitidus": "Discrete foci in the papillary dermis",
  "interface-liquenoide-histiocitos::dx-sarcoidose-liquenoide":
    "Discrete foci and sometimes confluent foci in the reticular dermis",
};

const optionHintTranslationsEn: Record<string, string> = {
  "root::dermatite": "Implemented algorithm",
  "root::deposito": "Amyloidoses implemented",
  "root::placeholder-cisto": "Implemented algorithm",
  "root::placeholder-hamartoma": "Future branch",
  "root::placeholder-neoplasia": "Implemented adnexal tumors",
};

const extraExactTextTranslations: Record<string, string> = {
  "Dicas que Valem Ouro: Dermatose Urticariforme Neutrofílica":
    "Golden Tips: Neutrophilic Urticarial Dermatosis",
  "Predom?nio de Linfócitos": "Predominance of lymphocytes",
  "Neutr?filos proeminentes": "Prominent neutrophils",
  "Eosinófilos proeminentes": "Prominent eosinophils",
  "Neutr?filos e Eosinófilos": "Neutrophils and eosinophils",
  "Neutr?filos, Eosinófilos e plasmócitos": "Neutrophils, eosinophils, and plasma cells",
  "Melan?fagos proeminentes": "Prominent melanophages",
  "Sider?fagos proeminentes": "Prominent siderophages",
  "Histopatológico: Dermatose Urticariforme Neutrofílica":
    "Histopathology ? Neutrophilic Urticarial Dermatosis",
  "visualização ampliada das 6 imagens histopatológicas, priorizando leitura ampla e confortável.":
    "Enlarged display of the 6 histopathology images, prioritizing broad and comfortable viewing.",
  "Descrição microscópica": "Microscopic description",
  "Dermatose Urticariforme Neutrofílica (DUN)":
    "Neutrophilic Urticarial Dermatosis (NUD)",
  "Revisão conceitual, histopatológica e clínico-sist?mica para diferenciar DUN de urticária vasculite e outras dermatoses neutrofílicas.":
    "Conceptual, histopathologic, and clinic-systemic review to differentiate NUD from urticarial vasculitis and other neutrophilic dermatoses.",
  "Reavalia?ão Conceitual e Hist?rica": "Conceptual and Historical Reappraisal",
  "Achados Histopatológicos": "Histopathologic findings",
  "Correla?ões clínicas e Sist?micas": "Clinical and systemic correlations",
  "Conclusão Diagnóstica": "Diagnostic conclusion",
  "Os cortes histol?gicos mostram pele com padrão de dermatite perivascular e intersticial, caracterizado por leve infiltrado inflamatério neutrofílico. As setas nas 3 ?ltimas imagens mostram EPITELIOTROPISMO em epiderme e gl?ndulas ?crinas, uma importante dica para diagnóstico de Dermatoses Neutrofílicas Urticariformes. Essa entidade ? frequentemente associada a Doenças autoinflamatérias ou autoimunes.":
    "The histologic sections show skin with a perivascular and interstitial dermatitis pattern, characterized by a mild neutrophilic inflammatory infiltrate. The arrows in the last 3 images highlight EPITHELIOTROPISM in the epidermis and eccrine glands, an important clue for the diagnosis of Neutrophilic Urticarial Dermatoses. This entity is frequently associated with autoinflammatory or autoimmune diseases.",
  "Predomínio de Linfócitos": "Predominance of lymphocytes",
  "Neutrófilos proeminentes": "Prominent neutrophils",
  "Neutrófilos e eosinófilos": "Neutrophils and eosinophils",
  "Neutrófilos, eosinófilos e plasmócitos": "Neutrophils, eosinophils, and plasma cells",
  "Melanfagos proeminentes": "Prominent melanophages",
  "Siderfagos proeminentes": "Prominent siderophages",
  "alteração pigmentar p?s-inflamatéria": "Post-inflammatory pigmentary alteration",
  "Pode se apresentar clinicamente como lesões hipo ou hipercrômicas e, histopatologicamente, como dermatose ?invis?vel?, com escasso infiltrado linfocitário e melan?fagos na derme superficial.":
    "It may present clinically as hypo- or hyperchromic lesions and, histopathologically, as an ?invisible? dermatitis with scant lymphocytic infiltrate and melanophages in the superficial dermis.",
  "Amiloidose macular": "Macular amyloidosis",
  "Caracteriza-se por pequenos depósitos globulares anfof?licos de amiloide tipo AK na derme papilar, geralmente associados a incontin?ncia pigmentar e melan?fagos.":
    "It is characterized by small amphophilic globular deposits of AK-type amyloid in the papillary dermis, usually associated with pigmentary incontinence and melanophages.",
  "Descrição microscpica": "Microscopic description",
  "Revisão conceitual, histopatológica e clínico-sistmica para diferenciar DUN de urticária vasculite e outras dermatoses neutrofílicas.":
    "Conceptual, histopathologic, and clinic-systemic review to differentiate NUD from urticarial vasculitis and other neutrophilic dermatoses.",
  "Dicas de especialista": "Specialist tips",
  "Reavaliaão Conceitual e Histrica": "Conceptual and Historical Reappraisal",
  "Paradigma Antigo (Anos 70): Originalmente descrita como lesões urticariformes associadas a doenças do tecido conjuntivo (como Lúpus) com alterações incipientes de vasculite leucocitoclástica.":
    "Old paradigm (1970s): originally described as urticarial lesions associated with connective tissue diseases (such as lupus) with incipient leukocytoclastic vasculitis changes.",
  "O \"viés\" Tcnico: Dr. LeBoit comenta que a Descrição original de Urticária Vasculite publicada no NEJM nos anos 1970 baseava-se em tcnicas de inclusão em plstico e cortes ultrafinos (2 mícrons), que revelavam danos vasculares extremamente sutis.":
    "The technical bias: Dr. LeBoit notes that the original description of urticarial vasculitis published in NEJM in the 1970s was based on plastic embedding techniques and ultrathin sections (2 microns), which revealed extremely subtle vascular damage.",
  "Visão Atual: Defende-se que muitos casos diagnosticados como Urticária Vasculite são, na verdade, manifestações de Dermatose Urticariforme Neutrofílica (DUN).":
    "Current view: many cases diagnosed as urticarial vasculitis are now considered manifestations of Neutrophilic Urticarial Dermatosis (NUD).",
  "padrão \"Sweet-like\": A morfologia da DUN assemelha-se síndrome de Sweet, porm com intensidade reduzida (\"menos de tudo\") e SEM EDEMA!":
    "\"Sweet-like\" pattern: the morphology of NUD resembles Sweet syndrome, but with reduced intensity (\"less of everything\") and WITHOUT EDEMA!",
  "Componentes Principais: Presença de neutrófilos e leucocitoclasia (\\\"poeira\\\" neutrofílica) intersticial (\\\"fila indiana\\\") e perivascular, sem a deposição severa de fibrina ou dano parietal proeminente das vasculites clssicas.":
    "Main components: neutrophils and leukocytoclasia (neutrophilic \"dust\") in an interstitial (\"Indian file\") and perivascular pattern, without the marked fibrin deposition or prominent wall injury of classic vasculitides.",
  "Epiteliotropismo neutrofílico: Um achado característico a atração de neutrófilos para: junção dermo-epidérmica (superfície inferior da epiderme) e espirais secretoras das glândulas écrinas.":
    "Neutrophilic epithelotropism: a characteristic finding is the attraction of neutrophils to the dermoepidermal junction (undersurface of the epidermis) and the secretory coils of eccrine glands.",
  "Correlaões clínicas e Sistmicas": "Clinical and systemic correlations",
  "Dermatografismo: Comum em pacientes com este espectro de lesões.":
    "Dermatographism: common in patients within this lesion spectrum.",
  "síndromes Autoinflamatrias: A DUN est intimamente relacionada a defeitos na imunidade inata.":
    "Autoinflammatory syndromes: NUD is closely related to defects in innate immunity.",
  "CAPS (síndrome Peridica Associada Criopirina): Destacada como a principal associaão autoinflamatária, onde a desregulaão neutrofílica sistmica se manifesta na pele como lesões urticariformes.":
    "CAPS (Cryopyrin-Associated Periodic Syndrome): highlighted as the main autoinflammatory association, in which systemic neutrophilic dysregulation manifests in the skin as urticarial lesions.",
  "A dificuldade em encontrar \\\"verdadeira vasculite\\\" em bipsias de urticária crônica/persistente deve-se, frequentemente, ao fato de a patologia ser uma dermatose neutrofílica intersticial, e não uma vasculite primária.":
    "The difficulty in finding \"true vasculitis\" in biopsies of chronic or persistent urticaria often reflects the fact that the pathology is an interstitial neutrophilic dermatosis rather than a primary vasculitis.",
  "Os cortes histolgicos mostram pele com padrão de dermatite perivascular e intersticial, caracterizado por leve infiltrado inflamatário neutrofílico. As setas nas 3 últimas imagens mostram EPITELIOTROPISMO em epiderme e glândulas écrinas, uma importante dica para diagnóstico de Dermatoses Neutrofílicas Urticariformes. Essa entidade frequentemente associada a doenças autoinflamatrias ou autoimunes.":
    "The histologic sections show skin with a perivascular and interstitial dermatitis pattern, characterized by a mild neutrophilic inflammatory infiltrate. The arrows in the last 3 images highlight EPITHELIOTROPISM in the epidermis and eccrine glands, an important clue for the diagnosis of Neutrophilic Urticarial Dermatoses. This entity is frequently associated with autoinflammatory or autoimmune diseases.",
};

const extraOptionLabelTranslationsEn: Record<string, string> = {
  "dermatite::dermatoses-invisiveis": "Invisible dermatoses",
  "pv-intersticial::dx-schamberg-2": "Predominance of lymphocytes",
  "pv-intersticial::group-pv-neutrofilos": "Prominent neutrophils",
  "pv-intersticial::group-pv-eosinofilos": "Prominent eosinophils",
  "pv-intersticial::dx-urticaria": "Neutrophils and eosinophils",
  "pv-intersticial::dx-morfeia-precoce": "Neutrophils, eosinophils, and plasma cells",
  "pv-intersticial::group-pv-melanofagos": "Prominent melanophages",
  "pv-intersticial::dx-estase": "Prominent siderophages",
};

function repairMojibake(text: string): string {
  let current = text;

  for (let index = 0; index < 3; index += 1) {
    if (!/[ÃÂ�\uFFFD?]/.test(current)) break;

    try {
      const repaired = decodeURIComponent(escape(current));
      if (!repaired || repaired === current) break;
      current = repaired;
    } catch {
      break;
    }
  }

  const directFixes: Array<[RegExp, string]> = [
    [/Histopatológico\s*[?�]\s*/gi, "Histopatológico — "],
    [/MODELO DE LAUDO HISTOPATOL[?�]GICO/gi, "MODELO DE LAUDO HISTOPATOLÓGICO"],
    [/Diagn[?�]stic/gi, "Diagnóstic"],
    [/In[?�]cio/gi, "Início"],
    [/Pr[?�]xima/gi, "Próxima"],
    [/Decis[?�]o/gi, "Decisão"],
    [/Avan[?�]ar/gi, "Avançar"],
    [/Revis[?�]o/gi, "Revisão"],
    [/Conclus[?�]o/gi, "Conclusão"],
    [/Descri[?�]{1,2}o/gi, "Descrição"],
    [/aus[?�]?ncia/gi, "ausência"],
    [/\bAusncia\b/g, "Ausência"],
    [/\btrs\b/gi, "três"],
    [/v[?�]nulas/gi, "vênulas"],
    [/informa[?�]{1,2}o/gi, "informação"],
    [/descri[?�]{1,2}o/gi, "descrição"],
    [/classifica[?�]{1,2}o/gi, "classificação"],
    [/visualiza[?�]{1,2}o/gi, "visualização"],
    [/altera[?�]{1,2}o/gi, "alteração"],
    [/deposi[?�]{1,2}o/gi, "deposição"],
    [/deposi[?�]{1,2}es/gi, "deposições"],
    [/infec[?�]{1,2}es/gi, "infecções"],
    [/correla[?�]{1,2}o/gi, "correlação"],
    [/rela[?�]{1,2}o/gi, "relação"],
    [/distribui[?�]{1,2}o/gi, "distribuição"],
    [/degenera[?�]{1,2}o/gi, "degeneração"],
    [/ulcera[?�]{1,2}o/gi, "ulceração"],
    [/margina[?�]{1,2}o/gi, "marginação"],
    [/class[?�]ic/gi, "classífic"],
    [/L[?�]pus/gi, "Lúpus"],
    [/L[?�]quen/gi, "Líquen"],
    [/morfolog[?�]c/gi, "morfológic"],
    [/patolog[?�]c/gi, "patológic"],
    [/patol[?�]g/gi, "patológ"],
    [/sistem[?�]c/gi, "sistêmic"],
    [/sist[?�]mic/gi, "sistêmic"],
    [/cl[?�]nic/gi, "clínic"],
    [/tecnic[?�]?/gi, "técnic"],
    [/cron[?�]c/gi, "crônic"],
    [/period[?�]c/gi, "periódic"],
    [/caracter[?�]stic/gi, "característic"],
    [/confort[?�]vel/gi, "confortável"],
    [/confortvel/gi, "confortável"],
    [/compat[?�]?vel/gi, "compatível"],
    [/compat[ée]vel/gi, "compatível"],
    [/compatvel/gi, "compatível"],
    [/vis[?�]o/gi, "visão"],
    [/vi[?�]s/gi, "viés"],
    [/les[?�]es/gi, "lesões"],
    [/b[?�]psias/gi, "biópsias"],
    [/m[?�]crons/gi, "mícrons"],
    [/linfocit[?�]r/gi, "linfocitár"],
    [/neutrof[?�]l/gi, "neutrofíl"],
    [/eosinof[?�]l/gi, "eosinofíl"],
    [/plasm[?�]cit/gi, "plasmócit"],
    [/histopatol[?�]g/gi, "histopatológ"],
    [/algor[?�]tm/gi, "algorítm"],
    [/v[?�]sico/gi, "vésico"],
    [/sin[?�]nim/gi, "sinônim"],
    [/espongi[?�]t/gi, "espongiót"],
    [/psor[?�]ase/gi, "psoríase"],
    [/hifas na camada c[?�]rnea/gi, "hifas na camada córnea"],
    [/corp[?�]?sculos/gi, "corpúsculos"],
    [/inclus[?�]?o/gi, "inclusão"],
    [/intracitoplasm[?�]?ticos/gi, "intracitoplasmáticos"],
    [/corpsculos de incluso intracitoplasmticos/gi, "corpúsculos de inclusão intracitoplasmáticos"],
    [/\bpossiveis\b/gi, "possíveis"],
    [/\bpossibilidades principais\b/gi, "possibilidades principais"],
    [/\bmalforma[çc]?a?o\b/gi, "malformação"],
    [/\bmalforma\S{0,2}o\b/gi, "malformação"],
    [/\bmalformaão\b/gi, "malformação"],
    [/Doen[?�]a/gi, "Doença"],
    [/doen[?�]a/gi, "doença"],
    [/dep[?�]sito/gi, "depósito"],
    [/\bdepsito\b/gi, "depósito"],
    [/\bdeposito\b/gi, "depósito"],
    [/\bdep\S?ito\b/gi, "depósito"],
    [/Calcifica[çc]?[õo]?es/gi, "Calcificações"],
    [/calcifica[çc]?[õo]?es/gi, "calcificações"],
    [/caocifica[çc]?[õo]?es/gi, "calcificações"],
    [/Calcifica\?es/g, "Calcificações"],
    [/calcifica\?es/g, "calcificações"],
    [/Linf[?�]citos/gi, "Linfócitos"],
    [/linf[?�]citos/gi, "linfócitos"],
    [/\binvisiveis\b/gi, "invisíveis"],
    [/\binvisveis\b/gi, "invisíveis"],
    [/\bpredomnio\b/gi, "predomínio"],
    [/\bpredominio\b/gi, "predomínio"],
    [/\blinfcitos\b/gi, "linfócitos"],
    [/\blinfocitos\b/gi, "linfócitos"],
    [/\blinfcitos\b/gi, "linfócitos"],
    [/Eosin[?�]filos/gi, "Eosinófilos"],
    [/eosin[?�]filos/gi, "eosinófilos"],
    [/\bneutrofilos\b/gi, "neutrófilos"],
    [/\beosinofilos\b/gi, "eosinófilos"],
    [/\beosinflos\b/gi, "eosinófilos"],
    [/\beosinfilos\b/gi, "eosinófilos"],
    [/\bplasmocitos\b/gi, "plasmócitos"],
    [/Histi[?�]citos/gi, "Histiócitos"],
    [/histi[?�]citos/gi, "histiócitos"],
    [/\bhistiocitos\b/gi, "histiócitos"],
    [/\bhistcitos\b/gi, "histiócitos"],
    [/Clulas/gi, "Células"],
    [/clulas/gi, "células"],
    [/estticos/gi, "estéticos"],
    [/Estticos/gi, "Estéticos"],
    [/Langerhans/gi, "Langerhans"],
    [/\bsiderfagos\b/gi, "siderófagos"],
    [/\bsiderofagos\b/gi, "siderófagos"],
    [/\bmelanfagos\b/gi, "melanófagos"],
    [/\bmelanofagos\b/gi, "melanófagos"],
    [/\bcorpusculos\b/gi, "corpúsculos"],
    [/\bincluso\b/gi, "inclusão"],
    [/\bintracitoplasmticos\b/gi, "intracitoplasmáticos"],
    [/Sarco[?�]dico/gi, "Sarcoídico"],
    [/sarco[?�]dico/gi, "sarcoídico"],
    [/\bpaliada\b/gi, "paliçada"],
    [/Pali[?�]ada/gi, "Paliçada"],
    [/pali[?�]ada/gi, "paliçada"],
    [/\bpalicada\b/gi, "paliçada"],
    [/\bcordoes\b/gi, "cordões"],
    [/Cord[?�]es/gi, "Cordões"],
    [/cord[?�]es/gi, "cordões"],
    [/\bhemacias\b/gi, "hemácias"],
    [/Hem[?�]cias/gi, "Hemácias"],
    [/hem[?�]cias/gi, "hemácias"],
    [/\bresiduo\b/gi, "resíduo"],
    [/\bresduo\b/gi, "resíduo"],
    [/Res[?�]duo/gi, "Resíduo"],
    [/res[?�]duo/gi, "resíduo"],
    [/\bas vezes\b/g, "às vezes"],
    [/\bAs vezes\b/g, "Às vezes"],
    [/(^|[\s([{"'])s vezes\b/g, "$1às vezes"],
    [/(^|[\s([{"'])S vezes\b/g, "$1Às vezes"],
    [/(^|[\s([{"'])[?�]s vezes\b/gi, "$1às vezes"],
    [/\bqueratinocitos\b/gi, "queratinócitos"],
    [/\bqueratinocito\b/gi, "queratinócito"],
    [/\bqueratincitos\b/gi, "queratinócitos"],
    [/\bqueratincito\b/gi, "queratinócito"],
    [/Queratin[?�]citos/gi, "Queratinócitos"],
    [/queratin[?�]citos/gi, "queratinócitos"],
    [/Queratin[?�]cito/gi, "Queratinócito"],
    [/queratin[?�]cito/gi, "queratinócito"],
    [/\bceratinocitos\b/gi, "queratinócitos"],
    [/\bceratinocito\b/gi, "queratinócito"],
    [/\bceratincitos\b/gi, "queratinócitos"],
    [/\bceratincito\b/gi, "queratinócito"],
    [/Ceratin[?�]citos/gi, "Queratinócitos"],
    [/ceratin[?�]citos/gi, "queratinócitos"],
    [/Ceratin[?�]cito/gi, "Queratinócito"],
    [/ceratin[?�]cito/gi, "queratinócito"],
    [/\bnecroticos\b/gi, "necróticos"],
    [/\bnecrotico\b/gi, "necrótico"],
    [/\bnecrticos\b/gi, "necróticos"],
    [/\bnecrtico\b/gi, "necrótico"],
    [/Necr[?�]ticos/gi, "Necróticos"],
    [/necr[?�]ticos/gi, "necróticos"],
    [/Necr[?�]tico/gi, "Necrótico"],
    [/necr[?�]tico/gi, "necrótico"],
    [/\bpapulas\b/gi, "pápulas"],
    [/\bartropode\b/gi, "artrópode"],
    [/\bartrpode\b/gi, "artrópode"],
    [/\blesoes\b/gi, "lesões"],
    [/\bcsticas\b/gi, "císticas"],
    [/\bcstica\b/gi, "cística"],
    [/\bsebceos\b/gi, "sebáceos"],
    [/\bsebceo\b/gi, "sebáceo"],
    [/\bsebcea\b/gi, "sebácea"],
    [/\bsebceas\b/gi, "sebáceas"],
    [/\banatmica\b/gi, "anatômica"],
    [/\banatmicas\b/gi, "anatômicas"],
    [/\blocalizao\b/gi, "localização"],
    [/\bespecfica\b/gi, "específica"],
    [/\bespecficas\b/gi, "específicas"],
    [/\bapcrinos\b/gi, "apócrinos"],
    [/\bapcrino\b/gi, "apócrino"],
    [/\becrinos\b/gi, "écrinos"],
    [/\becrino\b/gi, "écrino"],
    [/\bmetaplsico\b/gi, "metaplásico"],
    [/\bmetaplsica\b/gi, "metaplásica"],
    [/\bbroncognico\b/gi, "broncogênico"],
    [/\bbroncognica\b/gi, "broncogênica"],
    [/\bglndula\b/gi, "glândula"],
    [/\btriquilemal\b/gi, "triquilemal"],
    [/\bcatagnico\b/gi, "catagênico"],
    [/\bdiagnstico\b/gi, "diagnóstico"],
    [/Colageno/gi, "Colágeno"],
    [/colageno/gi, "colágeno"],
    [/lipafagos/gi, "lipófagos"],
    [/\bdiagnosticos\b/gi, "diagnósticos"],
    [/\bdiagnostico\b/gi, "diagnóstico"],
    [/\bhistologico\b/gi, "histológico"],
    [/\bhistologicos\b/gi, "histológicos"],
    [/\bmicroscpica\b/gi, "microscópica"],
    [/\bMicroscpica\b/g, "Microscópica"],
    [/\bmicroscpico\b/gi, "microscópico"],
    [/\bMicroscpico\b/g, "Microscópico"],
    [/\bhistopatologico\b/gi, "histopatológico"],
    [/\bhistopatologicas\b/gi, "histopatológicas"],
    [/\bclinico\b/gi, "clínico"],
    [/\bclinica\b/gi, "clínica"],
    [/\bsistemica\b/gi, "sistêmica"],
    [/\bsistemico\b/gi, "sistêmico"],
    [/\bsistmica\b/gi, "sistêmica"],
    [/\bsistmico\b/gi, "sistêmico"],
    [/\btecnica\b/gi, "técnica"],
    [/\btecnico\b/gi, "técnico"],
    [/\bconfortavel\b/gi, "confortável"],
    [/\bcompatíveis\b/gi, "compatíveis"],
    [/\bcompativeis\b/gi, "compatíveis"],
    [/\bcompatveis\b/gi, "compatíveis"],
    [/\bconteudo\b/gi, "conteúdo"],
    [/\bproximo\b/gi, "próximo"],
    [/\bproxima\b/gi, "próxima"],
    [/\barvore\b/gi, "árvore"],
    [/\bsarcodico\b/gi, "sarcoídico"],
    [/\bsarcoidico\b/gi, "sarcoídico"],
    [/\bvasculites torpidas\b/gi, "vasculites tórpidas"],
    [/\bnodulo\b/gi, "nódulo"],
    [/\bvenulas\b/gi, "vênulas"],
    [/\bsubcutneo\b/gi, "subcutâneo"],
    [/\bsubcutanea\b/gi, "subcutânea"],
    [/\bcol\?geno\b/gi, "colágeno"],
    [/\bcolgeno\b/gi, "colágeno"],
    [/\bcolgenos\b/gi, "colágenos"],
    [/\bdrmicas\b/gi, "dérmicas"],
    [/\bdrmicos\b/gi, "dérmicos"],
    [/\bdrmica\b/gi, "dérmica"],
    [/\bdrmico\b/gi, "dérmico"],
    [/\binterstcio\b/gi, "interstício"],
    [/\bepitlio\b/gi, "epitélio"],
    [/\bplpebras\b/gi, "pálpebras"],
    [/\bmltiplo\b/gi, "múltiplo"],
    [/\bequimticas\b/gi, "equimóticas"],
    [/\brgos\b/gi, "órgãos"],
    [/\btambm\b/gi, "também"],
    [/\baps\b/gi, "após"],
    [/\bmnimo\b/gi, "mínimo"],
    [/\btrs\b/gi, "três"],
    [/\btpica\b/gi, "típica"],
    [/\btpico\b/gi, "típico"],
    [/\bessencial\b/gi, "essencial"],
    [/\bbipsia\b/gi, "biópsia"],
    [/\bbipsias\b/gi, "biópsias"],
    [/\bclassificao\b/gi, "classificação"],
    [/\bimunofluorescncia\b/gi, "imunofluorescência"],
    [/\bpoliangite microscpica\b/gi, "poliangite microscópica"],
    [/\bcrioglobulinmica\b/gi, "crioglobulinêmica"],
    [/\bhipocomplementmica\b/gi, "hipocomplementêmica"],
    [/\bsch?nlein\b/gi, "Schönlein"],
    [/\blpus\b/gi, "lúpus"],
    [/\bLpus\b/g, "Lúpus"],
    [/\bleucocitoclstica\b/gi, "leucocitoclástica"],
    [/\bsptica\b/gi, "séptica"],
    [/\blinfoctico\b/gi, "linfocítico"],
    [/\bfenmeno\b/gi, "fenômeno"],
    [/\bmicroscpico\b/gi, "microscópico"],
    [/\bmetido algorítmico\b/gi, "método algorítmico"],
    [/\bbalonizaão\b/gi, "balonização"],
    [/\bassociaão\b/gi, "associação"],
    [/\bmanifestaão\b/gi, "manifestação"],
    [/\binflamaão\b/gi, "inflamação"],
    [/\binfecão\b/gi, "infecção"],
    [/\bseparaão\b/gi, "separação"],
    [/\bpadronizaão\b/gi, "padronização"],
    [/\bliquenificaão\b/gi, "liquenificação"],
    [/\bcorrelaão\b/gi, "correlação"],
    [/\bdistribuio\b/gi, "distribuição"],
    [/\bdegenerao\b/gi, "degeneração"],
    [/\bvisualizao\b/gi, "visualização"],
    [/\bdescrio\b/gi, "descrição"],
    [/\binformao\b/gi, "informação"],
    [/DiagnÃ3stico/g, "Diagnóstico"],
    [/\bn[?�]o\b/gi, "não"],
    [/\bs[?�]o\b/gi, "são"],
    [/padr[?�]o/gi, "padrão"],
    [/[?�]es\b/gi, "ões"],
    [/[?�]o\b/gi, "ão"],
    [/[?�]ria\b/gi, "ária"],
    [/[?�]rio\b/gi, "ário"],
    [/cl[?�]nica/gi, "clínica"],
    [/cl[?�]nico/gi, "clínico"],
    [/s[?�]ndrome/gi, "síndrome"],
    [/hipercr[?�]micas/gi, "hipercrômicas"],
    [/p[?�]pulas/gi, "pápulas"],
    [/p[?�]stula/gi, "pústula"],
    [/m[?�]cula/gi, "mácula"],
    [/n[?�]dulo/gi, "nódulo"],
    [/n[?�]dulos/gi, "nódulos"],
    [/c[?�]rnea/gi, "córnea"],
    [/�rvore/g, "árvore"],
    [/ap[?�]crin/gi, "apócrin"],
    [/\b[?�]crin/gi, "écrin"],
  ];

  let fixed = current;
  for (const [pattern, replacement] of directFixes) {
    fixed = fixed.replace(pattern, replacement);
  }

  fixed = fixed
    .replace(/\u00A0/g, " ")
    .replace(/Â(?=\S)/g, "")
    .replace(/\uFFFD/g, "")
    .replace(/\s{2,}/g, " ");

  // Some strings only become matchable after the replacement character is removed
  // (for example: "est�ticos" -> "estticos"), so run the targeted fixes once more.
  for (const [pattern, replacement] of directFixes) {
    fixed = fixed.replace(pattern, replacement);
  }

  fixed = fixed
    .replace(/\b(?:à)+s vezes\b/g, "às vezes")
    .replace(/\b(?:À)+s vezes\b/g, "Às vezes")
    .replace(/\b(?:à)+(?:às vezes)\b/g, "às vezes")
    .replace(/\b(?:À)+(?:às vezes)\b/g, "Às vezes")
    .replace(/\bÀs vezes\b/g, "Às vezes");

  return fixed.normalize("NFC");
}

function repairRecord(record: Record<string, string>) {
  return Object.fromEntries(Object.entries(record).map(([key, value]) => [repairMojibake(key), repairMojibake(value)]));
}

function repairNodeFieldRecord<
  T extends Record<
    string,
    Partial<{
      title: string;
      description: string;
      resultTitle: string;
    }>
  >,
>(record: T): T {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      repairMojibake(key),
      Object.fromEntries(
        Object.entries(value).map(([fieldKey, fieldValue]) => [fieldKey, typeof fieldValue === "string" ? repairMojibake(fieldValue) : fieldValue]),
      ),
    ]),
  ) as T;
}

const repairedUiTranslations = {
  pt: repairRecord(uiTranslations.pt),
  en: repairRecord(uiTranslations.en),
} as const;

const repairedExactTextTranslations = repairRecord(exactTextTranslations);
const repairedExtraExactTextTranslations = repairRecord({
  ...extraExactTextTranslations,
  "Histopatológico: Líquen plano": "Histopathology ? Lichen planus",
  "Histopatológico: Ceratose liquenoide / Queratose liquenoide": "Histopathology ? Benign lichenoid keratosis",
  "Histopatológico: Erup?ão polimorfa ? luz": "Histopathology ? Polymorphous light eruption",
  "Histopatológico: Dermatofitose": "Histopathology ? Dermatophytosis",
  "visualização ampliada das imagens histopatológicas, seguindo o padrão didático do aplicativo.":
    "Enlarged view of the histopathologic images, following the app's didactic pattern.",
  "Dermatofitose": "Dermatophytosis",
  "Trata-se de fragmentos de pele com epiderme exibindo paraceratose com microabscessos de neutrófilos, hiperplasia psoriasiforme e hipogranulose. Em derme superficial, h? leve infiltrado linfocitário perivascular. A colora?ão de PAS revelou presen?a de hifas septadas em camada córnea. Os achados são compatéveis com Dermatofitose, simulando psoríase histologicamente.":
    "These skin fragments show epidermis with parakeratosis containing neutrophilic microabscesses, psoriasiform hyperplasia, and hypogranulosis. In the superficial dermis, there is a mild perivascular lymphocytic infiltrate. PAS stain revealed septate hyphae in the stratum corneum. The findings are compatible with dermatophytosis, histologically simulating psoriasis.",
  "Trata-se de pele com epiderme exibindo ortoceratose, hipergranulose em cunha e hiperplasia irregular. Em derme, h? moderado infiltrado linfocitário em faixa, al?m de derrame pigmentar. Os achados são consistentes com o diagnóstico de Líquen Plano.":
    "This skin specimen shows epidermis with orthokeratosis, wedge-shaped hypergranulosis, and irregular hyperplasia. In the dermis, there is a moderate band-like lymphocytic infiltrate, along with pigment incontinence. The findings are consistent with lichen planus.",
  "Trata-se de pele com epiderme sem atipias exibindo ortoceratose e alteração vacuolar de interface. Em derme, h? moderado infiltrado linfocitário em faixa, corpos de Civatte e leve derrame pigmentar. Neste contexto clínico de lesão ?nica tumoral, os achados são consistentes com Ceratose Liquenoide Benigna. Ceratose liquenoide benigna ? geralmente resultado de rea?ão inflamatéria regressiva desencadeada por lentigo solar ou ceratose seborreica.":
    "This skin specimen shows epidermis without atypia, with orthokeratosis and vacuolar interface change. In the dermis, there is a moderate band-like lymphocytic infiltrate, Civatte bodies, and mild pigment incontinence. In the clinical context of a solitary tumoral lesion, the findings are consistent with benign lichenoid keratosis. Benign lichenoid keratosis usually represents a regressive inflammatory reaction triggered by solar lentigo or seborrheic keratosis.",
  "PITIR?ASE RUBRA PILAR": "PITYRIASIS RUBRA PILARIS",
});
const repairedManualExactTextTranslations = repairRecord({
  "Sem descrição.": "No description.",
  "Sem descrição dispon?vel.": "No description available.",
  "Dermatite": "Dermatitis",
  "Neoplasia": "Neoplasia",
  "Cisto": "Cyst",
  "Apenas perivascular": "Perivascular only",
  "Perivascular e intersticial": "Perivascular and interstitial",
  "Linfócitos apenas": "Lymphocytes only",
  "Linfócitos e Eosinófilos": "Lymphocytes and eosinophils",
  "Linfócitos e Histiócitos": "Lymphocytes and histiocytes",
  "Linfócitos e plasmócitos": "Lymphocytes and plasma cells",
  "Linfócitos e plasmócitos proeminentes": "Prominent lymphocytes and plasma cells",
  "Rea?ão de hipersensibilidade": "Hypersensitivity reaction",
  "Hansen?ase indeterminada": "Indeterminate leprosy",
  "psoríase": "Psoriasis",
  "Pitiríase rubra pilar": "Pityriasis rubra pilaris",
  "Dermatite seborreica": "Seborrheic dermatitis",
  "Candid?ase": "Candidiasis",
  "Ros?cea granulomatosa": "Granulomatous rosacea",
  "Painel contextual": "Context panel",
  "Favorito": "Favorite",
  "Favoritar": "Add to favorites",
  "Observa?ões": "Notes",
  "Refer?ncias": "References",
  "Dermatites perivasculares": "Perivascular dermatitis",
  "Sem alteração epid?rmica": "No epidermal change",
  "Balonizante": "Ballooning",
  "espongiótica": "Spongiotic",
  "Psoriasiforme": "Psoriasiform",
  "Psoriasiforme apenas": "Psoriasiform only",
  "Psoriasiforme e liquenoide": "Psoriasiform and lichenoid",
  "Doença de depósito": "Deposition disorder",
  "Hamartoma / malforma?ão": "Hamartoma / malformation",
  "Dermatites nodulares / difusas": "Nodular / diffuse dermatitis",
  "Dermatites vésico-bolhosas": "Vesicobullous dermatitis",
  "Vasculites": "Vasculitides",
  "Dermatites pustulosas": "Pustular dermatitis",
  "Foliculite / perifoliculite": "Folliculitis / perifolliculitis",
  "Dermatites fibrosantes": "Fibrosing dermatitis",
  "Paniculite": "Panniculitis",
  "Capilares espiralados em papila d?rmica delgada, cristas de comprimento uniforme, algumas cristas afinadas":
    "Spiraled capillaries in thin dermal papillae, rete ridges of uniform length, with some thinned ridges",
  "Cristas epid?rmicas de comprimento desigual, paraceratose, sem capilares espiralados em derme papilar":
    "Rete ridges of uneven length, parakeratosis, without spiraled capillaries in the papillary dermis",
  "padrão em tabuleiro de xadrez de ortoceratose e paraceratose":
    "Checkerboard pattern of orthokeratosis and parakeratosis",
  "Escamo-crosta nas pontas dos ?stios infundibulares":
    "Scale-crust at the tips of the infundibular ostia",
  "Hifas na camada córnea": "Hyphae in the stratum corneum",
  "Pseudohifas na camada córnea": "Pseudohyphae in the stratum corneum",
  "Hiperceratose, hipergranulose, feixes grosseiros de colágeno frequentemente perpendiculares à superfície cutânea em derme papilar espessada":
    "Hyperkeratosis, hypergranulosis, and coarse collagen bundles, often perpendicular to the skin surface in a thickened papillary dermis",
  "Hiperceratose, hipergranulose e feixes grosseiros de colágeno":
    "Hyperkeratosis, hypergranulosis, and coarse collagen bundles",
  "Histopatológico: Líquen plano": "Histopathology ? Lichen planus",
  "Histopatológico: Ceratose liquenoide / Queratose liquenoide": "Histopathology ? Benign lichenoid keratosis",
  "Histopatológico: Erup?ão polimorfa ? luz": "Histopathology ? Polymorphous light eruption",
  "Histopatológico: Dermatofitose": "Histopathology ? Dermatophytosis",
  "Histopatológico: Pitiríase rubra pilar": "Histopathology ? Pityriasis rubra pilaris",
  "Histopatológico: Dermatite Neutrofílica e Granulomatosa de Paliçada":
    "Histopathology ? Palisaded Neutrophilic and Granulomatous Dermatitis",
  "visualização ampliada das imagens histopatológicas, seguindo o padrão didático do aplicativo.":
    "Enlarged view of the histopathologic images, following the app's didactic pattern.",
  "visualização ampliada das 8 imagens histopatológicas, com foco em leitura confortável e detalhada.":
    "Enlarged display of the 8 histopathology images, with a focus on comfortable and detailed reading.",
  "Dermatofitose": "Dermatophytosis",
  "Dicas que Valem Ouro: Dermatose Urticariforme Neutrofílica":
    "Golden Tips: Neutrophilic Urticarial Dermatosis",
  "Histopatológico: Dermatose Urticariforme Neutrofílica":
    "Histopathology: Neutrophilic Urticarial Dermatosis",
  "Trata-se de fragmentos de pele com epiderme exibindo paraceratose com microabscessos de neutrófilos, hiperplasia psoriasiforme e hipogranulose. Em derme superficial, h? leve infiltrado linfocitário perivascular. A colora?ão de PAS revelou presen?a de hifas septadas em camada córnea. Os achados são compatéveis com Dermatofitose, simulando psoríase histologicamente.":
    "These skin fragments show epidermis with parakeratosis containing neutrophilic microabscesses, psoriasiform hyperplasia, and hypogranulosis. In the superficial dermis, there is a mild perivascular lymphocytic infiltrate. PAS stain revealed septate hyphae in the stratum corneum. The findings are compatible with dermatophytosis, histologically simulating psoriasis.",
  "Trata-se de pele com epiderme exibindo ortoceratose, hipergranulose em cunha e hiperplasia irregular. Em derme, h? moderado infiltrado linfocitário em faixa, al?m de derrame pigmentar. Os achados são consistentes com o diagnóstico de Líquen Plano.":
    "This skin specimen shows epidermis with orthokeratosis, wedge-shaped hypergranulosis, and irregular hyperplasia. In the dermis, there is a moderate band-like lymphocytic infiltrate, along with pigment incontinence. The findings are consistent with lichen planus.",
  "Trata-se de pele com epiderme sem atipias exibindo ortoceratose e alteração vacuolar de interface. Em derme, h? moderado infiltrado linfocitário em faixa, corpos de Civatte e leve derrame pigmentar. Neste contexto clínico de lesão ?nica tumoral, os achados são consistentes com Ceratose Liquenoide Benigna. Ceratose liquenoide benigna ? geralmente resultado de rea?ão inflamatéria regressiva desencadeada por lentigo solar ou ceratose seborreica.":
    "This skin specimen shows epidermis without atypia, with orthokeratosis and vacuolar interface change. In the dermis, there is a moderate band-like lymphocytic infiltrate, Civatte bodies, and mild pigment incontinence. In the clinical context of a solitary tumoral lesion, the findings are consistent with benign lichenoid keratosis. Benign lichenoid keratosis usually represents a regressive inflammatory reaction triggered by solar lentigo or seborrheic keratosis.",
  "PITIR?ASE RUBRA PILAR": "PITYRIASIS RUBRA PILARIS",
});
const repairedNodeFieldTranslationsEn = repairNodeFieldRecord(nodeFieldTranslationsEn);
const repairedOptionLabelTranslationsEn = repairRecord(optionLabelTranslationsEn);
const repairedOptionHintTranslationsEn = repairRecord(optionHintTranslationsEn);
const repairedExtraOptionLabelTranslationsEn = repairRecord(extraOptionLabelTranslationsEn);

function optionTranslationKey(parentId: string | undefined, option: Pick<NodeOption, "nextNodeId">) {
  return `${parentId ?? ""}::${option.nextNodeId}`;
}

export function translateText(text: string | undefined, language: Language): string {
  if (!text) return "";
  const repairedText = repairMojibake(text);
  if (language === "pt") return repairedText;
  return (
    repairedManualExactTextTranslations[repairedText] ??
    repairedExtraExactTextTranslations[repairedText] ??
    repairedExactTextTranslations[repairedText] ??
    repairedText
  );
}

export function capitalizeFirstLetter(text: string): string {
  const match = text.match(/\p{L}/u);
  if (match?.index === undefined) return text;

  const index = match.index;
  const character = text[index];
  return `${text.slice(0, index)}${character.toLocaleUpperCase("pt-BR")}${text.slice(index + character.length)}`;
}

export function translateNodeTitle(node: Pick<AlgorithmNode, "id" | "title">, language: Language): string {
  if (language === "pt") return repairMojibake(node.title);
  return repairedNodeFieldTranslationsEn[node.id]?.title ?? translateText(node.title, language);
}

export function translateNodeDescription(node: Pick<AlgorithmNode, "id" | "description">, language: Language): string {
  if (!node.description) return "";
  if (language === "pt") return repairMojibake(node.description);
  return repairedNodeFieldTranslationsEn[node.id]?.description ?? translateText(node.description, language);
}

export function translateNodeResultTitle(
  node: Pick<AlgorithmNode, "id" | "title" | "result">,
  language: Language,
): string {
  const source = node.result?.title ?? node.title;
  if (language === "pt") return repairMojibake(source);
  return repairedNodeFieldTranslationsEn[node.id]?.resultTitle ?? repairedNodeFieldTranslationsEn[node.id]?.title ?? translateText(source, language);
}

export function translateOptionLabel(
  parentId: string | undefined,
  option: Pick<NodeOption, "label" | "nextNodeId">,
  language: Language,
): string {
  if (language === "pt") return repairMojibake(option.label);
  return repairedExtraOptionLabelTranslationsEn[optionTranslationKey(parentId, option)] ?? repairedOptionLabelTranslationsEn[optionTranslationKey(parentId, option)] ?? translateText(option.label, language);
}

export function translateOptionHint(
  parentId: string | undefined,
  option: Pick<NodeOption, "hint" | "nextNodeId">,
  language: Language,
): string {
  if (!option.hint) return "";
  if (language === "pt") return repairMojibake(option.hint);
  return repairedOptionHintTranslationsEn[optionTranslationKey(parentId, option)] ?? translateText(option.hint, language);
}

export function t(language: Language, key: keyof typeof uiTranslations.pt): string {
  return repairedUiTranslations[language][key];
}

export function translateList(items: string[] | undefined, language: Language): string[] {
  return (items ?? []).map((item) => {
    const [title, description] = item.split("||");

    if (!description) {
      return translateText(item, language);
    }

    return `${translateText(title, language)}||${translateText(description, language)}`;
  });
}

export function getTranslatedTerminalLabel(type: NodeType, language: Language): string {
  if (language === "pt") {
    switch (type) {
      case "diagnosis":
        return "Diagnóstico";
      case "morphologic_terminal":
        return "Terminal morfológico";
      case "placeholder":
        return "Ramo futuro";
      case "info":
        return "Informação";
      default:
        return "Decisão";
    }
  }

  switch (type) {
    case "diagnosis":
      return "Diagnosis";
    case "morphologic_terminal":
      return "Morphologic terminal";
    case "placeholder":
      return "Future branch";
    case "info":
      return "Information";
    default:
      return "Decision";
  }
}





