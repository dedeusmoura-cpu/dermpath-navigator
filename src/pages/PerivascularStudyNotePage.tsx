import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FavoriteToggleButton } from "../components/FavoriteToggleButton";
import { Layout } from "../components/Layout";
import { Highlight, StudyNoteCard } from "../components/StudyNoteCard";
import type { StudyNoteSectionData } from "../components/StudyNoteCard";
import { BookIcon, ClipboardIcon, MicroscopeIcon, StethoscopeIcon } from "../components/icons/SectionIcons";
import { useLanguage } from "../context/LanguageContext";
import { algorithmTree } from "../data/algorithm";
import { useFavorites } from "../hooks/useFavorites";
import { buildPathToNode } from "../utils/tree";

type Enrichment = {
  clinical: string[];
  histology: string[];
  evaluation: string[];
  pearl: string;
};

const DEFAULT_ENRICHMENT: Enrichment = {
  clinical: [
    "A morfologia clínica, a distribuição e o tempo de evolução devem ser integrados ao padrão microscópico.",
    "Revisar exposição a fármacos, infecções recentes, sintomas sistêmicos e topografia das lesões.",
  ],
  histology: [],
  evaluation: [
    "Selecionar colorações especiais, imunofluorescência ou imuno-histoquímica de acordo com a hipótese.",
    "Se o padrão for inespecífico, a correlação clinicopatológica e a idade da lesão são decisivas.",
  ],
  pearl: "o padrão perivascular é um ponto de partida morfológico; o diagnóstico final depende da integração entre epiderme, infiltrado, distribuição e clínica.",
};

const ENRICHMENT_RULES: Array<{ match: RegExp; data: Partial<Enrichment>; exclusive?: boolean }> = [
  {
    match: /pitiríase liquenoide e varioliforme aguda|PLEVA/i,
    exclusive: true,
    data: {
      clinical: ["Erupção aguda de pápulas eritematosas que evoluem com vesícula, crosta ou necrose e podem deixar cicatriz varioliforme."],
      histology: [
        "Paraceratose focal sobre epiderme com espongiose e queratinócitos necróticos.",
        "Infiltrado linfocitário superficial e profundo em cunha, com exocitose variável.",
        "Extravasamento de hemácias é frequente; pode haver tumefação endotelial e neutrófilos nas lesões iniciais.",
      ],
      evaluation: ["Diferenciar de papulose linfomatoide, erupção medicamentosa e outras dermatoses com necrose de queratinócitos."],
      pearl: "na PLEVA, a combinação de paraceratose, queratinócitos necróticos, infiltrado em cunha e hemácias extravasadas é muito característica.",
    },
  },
  {
    match: /eritema pigmentar fixo/i,
    exclusive: true,
    data: {
      clinical: [
        "Placa eritemato-violácea bem delimitada que reaparece no mesmo local após nova exposição ao fármaco.",
        "A resolução costuma deixar hiperpigmentação residual; formas bolhosas podem apresentar necrose epidérmica extensa.",
      ],
      histology: [
        "Queratinócitos necróticos isolados, por vezes numerosos, associados a alteração vacuolar da camada basal.",
        "Edema da derme papilar e incontinência pigmentar com melanófagos superficiais.",
        "Infiltrado inflamatório dérmico misto, predominantemente superficial, com linfócitos, neutrófilos e eosinófilos ocasionais.",
        "Exocitose inflamatória pode acompanhar a lesão de interface; nas formas intensas ocorre necrose epidérmica confluente e clivagem.",
        "Em lesões tardias predominam melanófagos e pigmentação residual, com redução da inflamação ativa.",
      ],
      evaluation: [
        "Correlacionar com a cronologia medicamentosa e recorrência no mesmo sítio.",
        "Diferenciar de eritema multiforme, dermatite de interface por fármacos e, nas formas generalizadas bolhosas, necrólise epidérmica tóxica.",
      ],
      pearl: "queratinócitos necróticos com vacuolização basal, edema papilar, melanófagos e infiltrado dérmico misto sustentam eritema pigmentar fixo no contexto clínico adequado.",
    },
  },
  {
    match: /vitiligo|alteração pigmentar pós-inflamatória/i,
    data: {
      clinical: ["Distinguir despigmentação verdadeira de hipopigmentação; a lâmpada de Wood ajuda a delimitar a perda de pigmento."],
      histology: ["Comparar com pele normal adjacente e avaliar melanócitos por Melan-A ou SOX10 quando a rotina não for conclusiva."],
      evaluation: ["No vitiligo estabelecido há perda de melanócitos; na alteração pós-inflamatória predominam incontinência pigmentar e melanófagos."],
      pearl: "a presença ou ausência de melanócitos separa vitiligo de muitas hipocromias pós-inflamatórias.",
    },
  },
  {
    match: /dermatofitose|pitiríase versicolor/i,
    data: {
      clinical: ["Correlacionar descamação, topografia e fatores predisponentes; apresentações tratadas podem ser discretas."],
      histology: ["Pesquisar fungos na camada córnea em múltiplos níveis; PAS ou Grocott aumentam a sensibilidade."],
      evaluation: ["Um padrão espongiótico ou psoriasiforme não exclui micose superficial."],
      pearl: "antes de fechar uma dermatite espongiótica ou psoriasiforme, examine cuidadosamente a camada córnea e considere PAS.",
    },
  },
  {
    match: /eritema anular|eritema figurado|pitiríase rósea/i,
    data: {
      clinical: ["A borda ativa, o sentido de expansão e a posição da descamação ajudam a separar as erupções anulares."],
      histology: ["Manguitos linfocíticos perivasculares e focos de paraceratose devem ser interpretados com a configuração clínica."],
      evaluation: ["Excluir dermatofitose e revisar fármacos, infecções e doenças sistêmicas quando o curso for persistente."],
      pearl: "em lesões anulares, a localização da descamação e a correlação com a borda ativa valem tanto quanto o padrão histológico.",
    },
  },
  {
    match: /lúpus|dermatomiosite|erupção polimorfa.*luz|fototóxica|fotoalérgica|fotodermatite/i,
    data: {
      clinical: ["Fotodistribuição, fotossensibilidade e sinais sistêmicos orientam a interpretação."],
      histology: ["Pesquisar dermatite de interface, mucina dérmica, inflamação perianexial e alterações da membrana basal."],
      evaluation: ["A imunofluorescência e a sorologia são complementares e dependem do contexto clinicopatológico."],
      pearl: "mucina dérmica e inflamação perianexial favorecem lúpus, mas nenhum achado isolado substitui a correlação clínica.",
    },
  },
  {
    match: /schamberg|púrprica|gougerot|estase/i,
    data: {
      clinical: ["Máculas petequiais e acastanhadas predominam nos membros inferiores; avaliar insuficiência venosa e medicamentos."],
      histology: ["Extravasamento de hemácias, hemossiderina e infiltrado linfocitário superficial compõem o padrão de capilarite."],
      evaluation: ["Perls pode confirmar hemossiderina; ausência de necrose fibrinoide ajuda a afastar vasculite leucocitoclástica."],
      pearl: "capilarite apresenta hemácias extravasadas e hemossiderina sem a destruição vascular típica da vasculite leucocitoclástica.",
    },
  },
  {
    match: /wells|eosinofílico|artrópode|hipersensibilidade|urticária|penfigoide|pênfigo|PUPPP|gestação/i,
    data: {
      clinical: ["Prurido, duração individual das lesões, bolhas, exposição e relação temporal com medicamentos são pistas centrais."],
      histology: ["Quantificar eosinófilos, procurar espongiose eosinofílica, figuras em chama e padrão em cunha."],
      evaluation: ["Quando houver suspeita de doença bolhosa, colher biópsia perilesional para imunofluorescência direta."],
      pearl: "eosinófilos orientam a investigação, mas espongiose eosinofílica pode anteceder a bolha e exige correlação com imunofluorescência.",
    },
  },
  {
    match: /dermatite herpetiforme|IgA linear/i,
    data: {
      clinical: ["Distribuição, idade, prurido e configuração das vesículas ajudam a separar as dermatoses bolhosas por IgA."],
      histology: ["Neutrófilos papilares e clivagem subepidérmica podem ser sutis em lesões muito precoces."],
      evaluation: ["A imunofluorescência direta perilesional é essencial: IgA granular nas papilas favorece dermatite herpetiforme; IgA linear favorece doença por IgA linear."],
      pearl: "na suspeita de dermatose bolhosa por IgA, a biópsia perilesional para imunofluorescência é tão importante quanto a biópsia da lesão.",
    },
  },
  {
    match: /vasculite leucocitoclástica|dermatose urticariforme neutrofílica/i,
    data: {
      clinical: ["Púrpura palpável favorece vasculite; urticas transitórias com sintomas sistêmicos sugerem dermatose neutrofílica urticariforme."],
      histology: ["Procurar necrose fibrinoide e dano da parede vascular; leucocitoclasia isolada não define vasculite."],
      evaluation: ["A idade da lesão modifica o infiltrado; imunofluorescência direta deve ser feita em lesão recente quando indicada."],
      pearl: "neutrófilos e poeira nuclear não bastam: destruição da parede vascular é o divisor central entre vasculite e dermatose neutrofílica.",
    },
  },
  {
    match: /morphea/i,
    data: {
      clinical: ["Na fase inicial predominam eritema e halo violáceo; a esclerose se torna mais evidente com a evolução."],
      histology: ["A inflamação inicial é perivascular e perianexial; colágeno espessado e aprisionamento de anexos aparecem progressivamente."],
      evaluation: ["Uma biópsia profunda, incluindo hipoderme, melhora a avaliação da extensão e da fase da lesão."],
      pearl: "a morfeia inicial pode parecer apenas uma dermatite linfoplasmocitária; procure alterações sutis do colágeno e envolvimento profundo.",
    },
  },
  {
    match: /líquen plano|liquenoide|ceratose liquenoide|líquen nitidus|líquen escleroso/i,
    data: {
      clinical: ["Distribuição, prurido, mucosas, unhas e exposição medicamentosa ajudam a separar as dermatites liquenoides."],
      histology: ["Avaliar densidade e composição do infiltrado de interface, corpos apoptóticos, hipergranulose e arquitetura das cristas."],
      evaluation: ["Eosinófilos, paraceratose e infiltrado profundo podem favorecer reação liquenoide a drogas."],
      pearl: "o padrão liquenoide deve ser lido como um conjunto arquitetural; eosinófilos e paraceratose levantam a possibilidade de fármaco.",
    },
  },
  {
    match: /líquen estriado/i,
    data: {
      clinical: ["Erupção linear ao longo das linhas de Blaschko, geralmente unilateral e autolimitada."],
      histology: ["Dermatite espongiótica e liquenoide variável com infiltrado perianexial, especialmente periécrino."],
      evaluation: ["Diferenciar de líquen plano linear, NEVIL e outras dermatoses blaschko-lineares."],
      pearl: "infiltrado periécrino profundo em uma erupção linear infantil é uma pista clássica para líquen estriado.",
    },
  },
  {
    match: /eritema multiforme|pigmentar fixo|GVHD|mão-pé-boca|herpes|Mpox|Orf|ordenhadores/i,
    data: {
      clinical: ["Cronologia aguda, infecção ou fármaco precedente e distribuição das lesões são essenciais."],
      histology: ["Balonização e necrose de queratinócitos variam com a fase; procurar inclusões, multinucleação ou efeito citopático quando indicado."],
      evaluation: ["PCR, cultura ou imunohistoquímica podem ser necessários quando houver suspeita de infecção viral."],
      pearl: "nas dermatites balonizantes, a topografia da necrose e a presença de efeito citopático direcionam o diagnóstico.",
    },
  },
  {
    match: /dermatite de contato|dermatite numular|dermatite atópica|disidrótica|reação id|seborreica|pitiríase alba/i,
    data: {
      clinical: ["Prurido, exposição, topografia e cronicidade diferenciam os eczemas, que compartilham padrões microscópicos."],
      histology: ["Espongiose predomina nas lesões agudas; acantose e hiperqueratose aumentam nas lesões crônicas."],
      evaluation: ["Teste de contato é útil quando houver suspeita de dermatite alérgica de contato."],
      pearl: "a histologia reconhece o padrão e a fase do eczema; o subtipo quase sempre exige a história e a distribuição clínica.",
    },
  },
  {
    match: /psoríase|pitiríase rubra pilar|NEVIL/i,
    data: {
      clinical: ["Distribuição, morfologia da escama, unhas e padrão linear ou folicular ajudam a separar as dermatoses psoriasiformes."],
      histology: ["Comparar regularidade das cristas, camada granular, paraceratose, neutrófilos e capilares papilares."],
      evaluation: ["Fungos e eczemas crônicos são simuladores frequentes; PAS pode ser útil em casos selecionados."],
      pearl: "o diagnóstico psoriasiforme nasce da combinação entre arquitetura epidérmica e padrão da camada córnea, não de um achado isolado.",
    },
  },
  {
    match: /micose fungoide/i,
    data: {
      clinical: ["Placas persistentes em áreas não fotoexpostas e evolução lenta aumentam a suspeita clínica."],
      histology: ["Epidermotropismo desproporcional à espongiose, linfócitos atípicos e alinhamento basal são pistas importantes."],
      evaluation: ["Biópsias seriadas, imunofenótipo e estudo de clonabilidade podem ser necessários."],
      pearl: "na micose fungoide inicial, a persistência clinicopatológica e biópsias repetidas são mais informativas que um único achado sutil.",
    },
  },
  {
    match: /sarcoidose|his.?tiocitose de células de langerhans/i,
    data: {
      clinical: ["A distribuição e a pesquisa de envolvimento extracutâneo orientam a interpretação de infiltrados histiocitários."],
      histology: ["Na sarcoidose, granulomas tendem a ser compactos e pouco inflamados; na histiocitose, procurar células reniformes e eosinófilos."],
      evaluation: ["Usar colorações para microrganismos antes de assumir sarcoidose; CD1a, langerina e S100 apoiam histiocitose de Langerhans."],
      pearl: "granuloma sarcoídico é diagnóstico de exclusão; sempre afaste agentes infecciosos e corpos estranhos.",
    },
  },
  {
    match: /sífilis|eritema migrans|hanseníase|eritrasma|ceratólise/i,
    data: {
      clinical: ["Epidemiologia, distribuição e exame sistêmico direcionam os testes confirmatórios."],
      histology: ["Plasmócitos, histiócitos, alterações endoteliais ou organismos devem ser procurados conforme a hipótese."],
      evaluation: ["Usar sorologia, colorações especiais, imunohistoquímica ou métodos moleculares de forma dirigida."],
      pearl: "um infiltrado perivascular rico em plasmócitos ou histiócitos deve acionar uma busca orientada por infecção.",
    },
  },
  {
    match: /exantema viral|erupção por droga/i,
    data: {
      clinical: ["Cronologia medicamentosa, febre, sintomas virais e envolvimento mucoso são mais discriminativos que a histologia isolada."],
      histology: ["O padrão pode ser sutil e variável, com infiltrado perivascular, eosinófilos e queratinócitos apoptóticos em combinações diversas."],
      evaluation: ["Procurar sinais de gravidade e suspender o agente suspeito quando clinicamente indicado."],
      pearl: "exantema viral e farmacodermia frequentemente compartilham histologia; a linha do tempo clínica decide.",
    },
  },
  {
    match: /amiloidose macular|prurigo pigmentoso/i,
    data: {
      clinical: ["Prurido, fricção e padrão reticulado de hiperpigmentação ajudam a orientar o diagnóstico."],
      histology: ["Na amiloidose macular, procurar pequenos depósitos na derme papilar; no prurigo pigmentoso, a fase da lesão altera marcadamente o padrão."],
      evaluation: ["Vermelho Congo ou cristal violeta podem confirmar amiloide quando o HE for duvidoso."],
      pearl: "a idade da lesão e a correlação com o padrão pigmentado são fundamentais nas dermatoses clinicamente reticuladas.",
    },
  },
  {
    match: /acrodermatite enteropática|pelagra|kwashiorkor|eritema necrolítico migratório/i,
    data: {
      clinical: ["Distribuição acral ou periorificial, contexto nutricional e sintomas sistêmicos direcionam a investigação."],
      histology: ["Palidez e necrose superficial da epiderme, paraceratose e balonização podem produzir um padrão de deficiência nutricional."],
      evaluation: ["Correlacionar com zinco, niacina, estado proteico e, no eritema necrolítico migratório, investigação para glucagonoma."],
      pearl: "necrose epidérmica superficial com distribuição característica deve levantar deficiência nutricional ou síndrome do glucagonoma.",
    },
  },
  {
    match: /miliária rubra|incontinentia pigmenti|eritema tóxico do recém-nascido/i,
    data: {
      clinical: ["Idade, momento de aparecimento e distribuição são decisivos nas erupções neonatais e relacionadas ao suor."],
      histology: ["Miliária centra-se no acrossiríngio; incontinentia pigmenti evolui por fases; eritema tóxico mostra pústulas eosinofílicas."],
      evaluation: ["Correlacionar com sexo, história familiar e evolução; investigação genética é indicada quando houver suspeita de incontinentia pigmenti."],
      pearl: "em erupções neonatais, a idade exata da lesão e o compartimento epidérmico envolvido evitam diagnósticos excessivos.",
    },
  },
  {
    match: /líquen simples crônico|prurigo nodular|acanthoma fissuratum|condrodermatite nodular/i,
    data: {
      clinical: ["Prurido crônico, atrito, pressão e topografia explicam grande parte das lesões hiperqueratóticas reacionais."],
      histology: ["Hiperqueratose, hipergranulose, acantose e colágeno papilar verticalizado traduzem coçadura ou fricção persistente."],
      evaluation: ["Procurar uma dermatose pruriginosa de base e correlacionar com o sítio de trauma mecânico."],
      pearl: "colágeno papilar verticalizado é uma assinatura útil de fricção crônica, mas a topografia define a entidade clínica.",
    },
  },
];

function getEnrichment(title: string): Enrichment {
  const matches = ENRICHMENT_RULES.filter((rule) => rule.match.test(title));
  const exclusiveMatch = matches.find((rule) => rule.exclusive);
  const selectedRules = exclusiveMatch ? [exclusiveMatch] : matches;
  return selectedRules.reduce<Enrichment>(
    (result, rule) => ({
      clinical: [...result.clinical, ...(rule.data.clinical ?? [])],
      histology: [...result.histology, ...(rule.data.histology ?? [])],
      evaluation: [...result.evaluation, ...(rule.data.evaluation ?? [])],
      pearl: rule.data.pearl ?? result.pearl,
    }),
    DEFAULT_ENRICHMENT,
  );
}

function getPatternConcept(pathIds: string[]): string[] {
  if (pathIds.includes("nodular-difusa")) {
    return [
      "Dermatite nodular ou difusa definida por infiltrado dérmico denso, cuja população celular dominante direciona o diagnóstico.",
      "Arquitetura, profundidade, relação com anexos e presença de necrose ou granulomas devem ser integradas.",
    ];
  }

  if (pathIds.includes("vesico-bolhosa")) {
    return [
      "Dermatose vesicobolhosa classificada pelo nível da clivagem e pelo mecanismo de separação epidérmica ou dermoepidérmica.",
      "Histologia da lesão e imunofluorescência perilesional são exames complementares.",
    ];
  }

  if (pathIds.includes("vasculites")) {
    return [
      "Processo inflamatório vascular classificado pelo calibre e tipo do vaso, composição do infiltrado e natureza do dano parietal.",
      "A idade da lesão modifica significativamente o padrão microscópico e o rendimento da imunofluorescência.",
    ];
  }

  if (pathIds.includes("pustulosas")) {
    return [
      "Dermatose pustulosa organizada pelo compartimento que contém neutrófilos e pelas alterações epidérmicas associadas.",
      "Infecção deve ser excluída antes de classificar uma pústula como estéril ou inflamatória.",
    ];
  }

  if (pathIds.includes("foliculite-perifoliculite")) {
    return [
      "Processo inflamatório centrado na unidade pilossebácea, com padrão infundibular, folicular ou perifolicular.",
      "Ruptura folicular, conteúdo do lúmen e tipo de infiltrado são os principais elementos diagnósticos.",
    ];
  }

  if (pathIds.includes("fibrosantes")) {
    return [
      "Dermatose fibrosante caracterizada por alteração da quantidade, espessura ou organização do colágeno dérmico.",
      "A fase da lesão e a extensão para septos, fáscia ou hipoderme devem ser documentadas.",
    ];
  }

  if (pathIds.includes("paniculites")) {
    return [
      "Paniculite classificada inicialmente como septal ou lobular e pela presença ou ausência de vasculite.",
      "Uma biópsia profunda e representativa é indispensável para avaliar todo o tecido subcutâneo.",
    ];
  }

  if (pathIds.includes("perivascular-interface")) {
    return [
      "Dermatite de interface definida por lesão dos queratinócitos basais e alteração da junção dermoepidérmica.",
      "O padrão pode ser vacuolar ou liquenoide; a composição e a profundidade do infiltrado refinam o diagnóstico.",
    ];
  }

  if (pathIds.includes("perivascular-balonizante")) {
    return [
      "Padrão de injúria epidérmica com balonização de queratinócitos e graus variáveis de necrose individual ou confluente.",
      "A distribuição da necrose e a presença de efeito citopático orientam as principais etiologias.",
    ];
  }

  if (pathIds.includes("perivascular-espongiotica")) {
    return [
      "Dermatite espongiótica caracterizada por edema intercelular epidérmico, cuja intensidade varia com a fase da lesão.",
      "A arquitetura associada - puramente espongiótica, psoriasiforme ou liquenoide - organiza os diferenciais.",
    ];
  }

  if (pathIds.includes("perivascular-psoriasiforme")) {
    return [
      "Padrão de hiperplasia epidérmica em que a forma e a regularidade das cristas são centrais para o diagnóstico.",
      "Camada córnea, camada granular, neutrófilos e vasos papilares devem ser avaliados em conjunto.",
    ];
  }

  return [
    "Dermatite perivascular com mínima ou nenhuma alteração epidérmica significativa.",
    "A distribuição superficial ou profunda e a composição do infiltrado são as principais chaves de classificação.",
  ];
}

function getFamilyHistology(pathIds: string[]): string[] {
  if (pathIds.includes("nodular-difusa")) {
    return [
      "Infiltrado inflamatório dérmico nodular ou difuso, superficial e profundo, composto pela população celular dominante do respectivo ramo.",
      "Descrever relação perivascular, perianexial ou intersticial, presença de zona de Grenz, necrose, granulomas e extensão à hipoderme.",
      "Avaliar epidermotropismo, atipia e padrão arquitetural quando linfócitos predominarem; pesquisar agentes infecciosos nos infiltrados granulomatosos ou supurativos.",
    ];
  }
  if (pathIds.includes("vesico-bolhosa")) {
    return [
      "Definir o nível da clivagem: intraepidérmica, subepidérmica ou dermoepidérmica.",
      "Descrever acantólise, necrose de queratinócitos e composição do infiltrado dérmico, incluindo eosinófilos ou neutrófilos.",
      "A imunofluorescência direta perilesional localiza os depósitos e complementa a morfologia da lesão.",
    ];
  }
  if (pathIds.includes("vasculites")) {
    return [
      "Infiltrado perivascular e intramural cuja composição varia com a entidade e a idade da lesão.",
      "Documentar tumefação endotelial, leucocitoclasia, necrose fibrinoide, trombose e extravasamento de hemácias.",
      "Identificar o calibre e o tipo do vaso acometido e pesquisar depósitos imunes em lesão recente quando indicado.",
    ];
  }
  if (pathIds.includes("pustulosas")) {
    return [
      "Coleções de neutrófilos intracórneas, subcórneas ou intraepidérmicas, conforme a entidade.",
      "Descrever espongiose, acantólise, necrose de queratinócitos e infiltrado dérmico perivascular com neutrófilos e eosinófilos.",
      "Pesquisar bactérias e fungos por colorações especiais quando houver suspeita de pústula infecciosa.",
    ];
  }
  if (pathIds.includes("foliculite-perifoliculite")) {
    return [
      "Infiltrado inflamatório centrado no infundíbulo, epitélio folicular ou tecido perifolicular.",
      "Descrever ruptura da parede, supuração, granulomas, fibrose e presença de pelos livres ou material estranho na derme.",
      "Pesquisar microrganismos no lúmen e na parede folicular com colorações dirigidas.",
    ];
  }
  if (pathIds.includes("fibrosantes")) {
    return [
      "Feixes de colágeno alterados em espessura, homogeneização e orientação, com redução variável dos espaços intersticiais.",
      "O infiltrado dérmico costuma ser perivascular e perianexial nas fases iniciais e diminui com a progressão da esclerose.",
      "Documentar aprisionamento ou perda de anexos, extensão à hipoderme e alterações de vasos, mucina e fibras elásticas.",
    ];
  }
  if (pathIds.includes("paniculites")) {
    return [
      "Inflamação predominantemente septal ou lobular, composta por linfócitos, neutrófilos, histiócitos ou infiltrado misto conforme a entidade.",
      "Descrever necrose adipocitária, lipomembranas, granulomas, cristais, mucina e extensão para derme profunda.",
      "Avaliar sistematicamente artérias e veias para vasculite, trombose ou flebite, além de pesquisar agentes infecciosos quando indicado.",
    ];
  }
  return [
    "Infiltrado inflamatório dérmico perivascular ou perivascular e intersticial, cuja composição deve ser descrita para a entidade.",
    "Correlacionar as alterações epidérmicas, vasculares e anexiais com a fase clínica da lesão.",
  ];
}

export function PerivascularStudyNotePage() {
  const { nodeId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { isFavorite, toggleFavorite } = useFavorites();
  const node = algorithmTree.nodes[nodeId];
  const path = node ? buildPathToNode(node.id) : [];
  const isDermatitisDiagnosis = Boolean(node && path.some((item) => item.id === "dermatite"));

  if (!node || !isDermatitisDiagnosis) {
    return (
      <Layout title="Tome nota" subtitle="Resumo prático para dermatopatologia">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-950">
          <p>Este diagnóstico não pertence ao ramo das dermatites.</p>
          <Link to="/diagnostico?nodeId=dermatite" className="mt-4 inline-block font-semibold underline">
            Voltar às dermatites
          </Link>
        </div>
      </Layout>
    );
  }

  const returnToNodeId = (location.state as { returnToNodeId?: string } | null)?.returnToNodeId ?? node.id;
  const enrichment = getEnrichment(node.title);
  const pathIds = path.map((item) => item.id);
  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "conceito",
      number: "1",
      color: "green",
      title: "Conceito",
      icon: <BookIcon />,
      bullets: getPatternConcept(pathIds),
    },
    {
      id: "histopatologia",
      number: "3",
      color: "purple",
      title: "Histopatologia",
      icon: <MicroscopeIcon />,
      bullets: enrichment.histology.length ? enrichment.histology : getFamilyHistology(pathIds),
    },
  ];

  const sectionsRight: StudyNoteSectionData[] = [
    {
      id: "pistas-clinicas",
      number: "2",
      color: "blue",
      title: "Pistas clínicas",
      icon: <StethoscopeIcon />,
      bullets: enrichment.clinical,
    },
    {
      id: "avaliacao",
      number: "4",
      color: "orange",
      title: "Avaliação / diferenciais",
      icon: <ClipboardIcon />,
      bullets: enrichment.evaluation,
    },
  ];

  return (
    <Layout title="Tome nota" subtitle="Resumo prático para dermatopatologia">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => navigate("/diagnostico", { state: { nodeId: returnToNodeId } })}
          className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white"
        >
          Voltar ao diagnóstico
        </button>
        <button type="button" onClick={() => navigate(-1)} className="rounded-full border border-sand bg-white px-5 py-2.5 text-sm font-semibold text-ink">
          {t("back")}
        </button>
        <FavoriteToggleButton nodeId={node.id} favorite={isFavorite(node.id)} onToggleFavorite={toggleFavorite} />
      </div>

      <StudyNoteCard
        title={node.title}
        subtitle="Resumo prático para dermatopatologia"
        sectionsLeft={sectionsLeft}
        sectionsRight={sectionsRight}
        note={<>Conteúdo de revisão estruturado a partir do <Highlight>Bolognia Dermatology</Highlight> e do padrão morfológico do diagnóstico.</>}
        pearl={enrichment.pearl}
        source="Fonte: Bolognia — Dermatology, 2-volume set."
      />
    </Layout>
  );
}
