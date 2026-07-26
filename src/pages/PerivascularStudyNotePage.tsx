import type { ReactNode } from "react";
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
  concept: ReactNode[];
  clinical: ReactNode[];
  histology: ReactNode[];
  evaluation: ReactNode[];
  pearl: ReactNode;
};

const DEFAULT_ENRICHMENT: Enrichment = {
  concept: [],
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

const ENRICHMENT_RULES: Array<{ match: RegExp; data: Partial<Enrichment>; exclusive?: boolean; replaceDefaults?: boolean }> = [
  {
    match: /pitiríase liquenoide|PLEVA/i,
    exclusive: true,
    data: {
      clinical: [
        "Surtos recorrentes de pápulas eritematosas a purpúricas, espontaneamente regressivas; PLEVA e PLC são dois extremos do mesmo espectro.",
        "Na PLEVA as lesões costumam ter crosta e, por vezes, vesícula ou pústula, podendo deixar cicatriz varioliforme; na PLC predomina a escama.",
      ],
      histology: [
        "Dermatite de interface perivascular superficial em todos os casos; nas lesões mais agudas o infiltrado é mais denso, podendo ser em cunha e \"top-heavy\".",
        "Exocitose linfocitária para o epitélio anexial (folicular e écrino), paraceratose e dano epidérmico variando de edema até necrose extensa.",
        "Extravasamento de hemácias é frequente, inclusive na epiderme; uma verdadeira vasculite linfocítica com necrose fibrinoide é incomum, ocorrendo ocasionalmente na PLEVA.",
        "Nas lesões mais crônicas (PLC), o infiltrado de interface é mais discreto, com paraceratose, necrose focal de queratinócitos e extravasamento discreto de hemácias.",
      ],
      evaluation: [
        "Atipia linfoide não é esperada; poucos linfócitos atípicos ou CD30+ podem ocorrer sem configurar papulose linfomatoide.",
        "Diferenciais: papulose linfomatoide, picada de artrópode, vasculite de pequenos vasos, varicela/exantema enteroviral e erupção por drogas (PLEVA); psoríase gutata, líquen plano exantemático, pitiríase rósea e sífilis secundária (PLC).",
      ],
      pearl: "PLEVA e PLC formam um espectro único: dermatite de interface com necrose de queratinócitos, exocitose para anexos e hemácias extravasadas, mais intensa e em cunha na forma aguda.",
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
    match: /pitiríase versicolor/i,
    exclusive: true,
    replaceDefaults: true,
    data: {
      concept: [
        <>Micose superficial de resposta inflamatória <Highlight>mínima ou ausente</Highlight>, limitada à <Highlight>camada córnea</Highlight>.</>,
        <>Ocorre quando a forma leveduriforme de <em>Malassezia</em> se transforma na <Highlight>forma micelial</Highlight>; seu caráter lipofílico explica a predileção por <Highlight>áreas ricas em sebo</Highlight>.</>,
      ],
      clinical: [
        <>Múltiplas máculas, manchas ou placas finas, ovais a arredondadas, com <Highlight>escama fina e furfurácea</Highlight> que pode se tornar evidente apenas ao <Highlight>raspar ou estirar a pele</Highlight>.</>,
        <>As lesões podem confluir no centro das áreas acometidas e predominam em <Highlight>regiões seborreicas</Highlight>, sobretudo <Highlight>tronco superior e ombros</Highlight>.</>,
        <>A cor varia entre <Highlight>castanha</Highlight> (hiperpigmentada), <Highlight>branco-acastanhada</Highlight> (hipopigmentada) e, menos frequentemente, rosada por inflamação discreta.</>,
        <>Face — <Highlight>especialmente em crianças</Highlight> —, couro cabeludo, fossas antecubitais, região inframamária e virilhas podem ser acometidos; o envolvimento flexural é denominado <Highlight>pitiríase versicolor inversa</Highlight>.</>,
        <>Geralmente <Highlight>assintomática</Highlight>, é mais comum em <Highlight>adolescentes e adultos jovens</Highlight> e favorecida por <Highlight>clima quente e úmido, pele oleosa e sudorese excessiva</Highlight>.</>,
      ],
      histology: [
        <>Pode se apresentar como uma <Highlight>"dermatose invisível"</Highlight> histopatologicamente, com <Highlight>inflamação mínima ou ausente</Highlight>.</>,
        <><Highlight>Esporos arredondados e hifas fúngicas curtas basofílicas</Highlight> estão presentes na <Highlight>camada córnea</Highlight> e geralmente são <Highlight>facilmente identificáveis no HE</Highlight>.</>,
      ],
      evaluation: [
        <>Em "dermatoses invisíveis", avaliar sempre a <Highlight>camada córnea em busca de fungos</Highlight>.</>,
        <>Dermatófitos apresentam-se como <Highlight>hifas septadas hialinas</Highlight>, de difícil identificação no HE; em geral, <Highlight>PAS ou Grocott</Highlight> são necessários para demonstrá-los.</>,
        <>Em comparação com a pitiríase versicolor, a <Highlight>dermatofitose costuma ser mais inflamatória</Highlight>, com <Highlight>espongiose, hiperplasia psoriasiforme, alterações vesicobolhosas</Highlight> e inflamação dérmica mais intensa.</>,
      ],
      pearl: <>Pitiríase versicolor apresenta <Highlight>esporos e hifas fúngicas basofílicas</Highlight> na camada córnea, no padrão <Highlight>"espaguete com almôndegas"</Highlight>. Em contraste, a colonização não patogênica por <em>Malassezia</em> sp. apresenta <Highlight>apenas esporos, sem formação de hifas</Highlight>.</>,
    },
  },
  {
    match: /dermatofitose/i,
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
    match: /lúpus|dermatomiosite|erupção polimorfa.*luz|fotodermatite/i,
    data: {
      clinical: ["Fotodistribuição, fotossensibilidade e sinais sistêmicos orientam a interpretação."],
      histology: ["Pesquisar dermatite de interface, mucina dérmica, inflamação perianexial e alterações da membrana basal."],
      evaluation: ["A imunofluorescência e a sorologia são complementares e dependem do contexto clinicopatológico."],
      pearl: "mucina dérmica e inflamação perianexial favorecem lúpus, mas nenhum achado isolado substitui a correlação clínica.",
    },
  },
  {
    match: /queimadura|fototóxic/i,
    exclusive: true,
    data: {
      clinical: [
        "Reação dose-dependente (pode ocorrer em qualquer indivíduo), surgindo em horas após exposição a agente fototóxico (tópico ou sistêmico) e radiação UVA.",
        "Quadro semelhante a queimadura solar exagerada: eritema, edema, ardor; casos intensos podem ter vesículas e bolhas, resolvendo com descamação e hiperpigmentação.",
      ],
      histology: [
        "Queratinócitos necróticos dispersos (\"células de queimadura solar\"/sunburn cells) na epiderme.",
        "Infiltrado dérmico superficial discreto, predominantemente de linfócitos e neutrófilos, sem os achados de dermatite de interface mais elaborada do lúpus.",
      ],
      evaluation: ["Diferenciar de queimadura solar comum (exige mais UV), de fotoalergia (padrão espongiótico, imunomediado) e de lúpus eritematoso; correlacionar com fármacos fototóxicos e cronologia de exposição solar."],
      pearl: "necrose de queratinócitos dispersa com infiltrado superficial escasso, em horas após exposição solar associada a agente fototóxico, é o padrão-chave — sem espongiose proeminente, que sugeriria fotoalergia.",
    },
  },
  {
    match: /dermatite fotoalérgica/i,
    exclusive: true,
    data: {
      clinical: [
        "Reação de hipersensibilidade do tipo tardio, exigindo sensibilização prévia; só ocorre em indivíduos sensibilizados, ao contrário da fototoxicidade.",
        "Erupção eczematosa pruriginosa em área fotoexposta, por vezes indistinguível clinicamente da fototoxicidade; fotopatch teste confirma o diagnóstico.",
      ],
      histology: ["Espongiose epidérmica com infiltrado linfo-histiocitário dérmico superficial, indistinguível histologicamente de outras dermatites espongióticas."],
      evaluation: ["Diferenciar de dermatite de contato aerotransportada (que também acomete pálpebras superiores, região submentoniana e retroauricular, tipicamente poupadas na fotoalergia) e de fototoxicidade (necrose de queratinócitos, sem espongiose proeminente)."],
      pearl: "fotoalergia é espongiótica e poupa áreas classicamente afetadas na dermatite de contato aerotransportada; a fototoxicidade tem queratinócitos necróticos e não exige sensibilização prévia.",
    },
  },
  {
    match: /schamberg|púrprica|estase/i,
    data: {
      clinical: ["Máculas petequiais e acastanhadas predominam nos membros inferiores; avaliar insuficiência venosa e medicamentos."],
      histology: ["Extravasamento de hemácias, hemossiderina e infiltrado linfocitário superficial compõem o padrão de capilarite."],
      evaluation: ["Perls pode confirmar hemossiderina; ausência de necrose fibrinoide ajuda a afastar vasculite leucocitoclástica."],
      pearl: "capilarite apresenta hemácias extravasadas e hemossiderina sem a destruição vascular típica da vasculite leucocitoclástica.",
    },
  },
  {
    match: /gougerot|purpura liquenoide|púrpura liquenoide/i,
    exclusive: true,
    data: {
      clinical: ["Combina lesões tipo Schamberg com pápulas liquenoides purpúricas vermelho-acastanhadas, crônicas e por vezes pruriginosas, tipicamente em membro inferior de homens de meia-idade."],
      histology: [
        "Como nas demais dermatoses purpúricas pigmentadas: extravasamento de hemácias, tumefação endotelial, infiltrado linfocitário perivascular e macrófagos com hemossiderina.",
        "Nesta variante e na púrpura eczematoide de Doucas-Kapetanakis, some-se um infiltrado liquenoide, com espongiose epidérmica e paraceratose focal.",
      ],
      evaluation: ["Clinicamente pode ser confundida com vasculite cutânea de pequenos vasos; a ausência de necrose fibrinoide na biópsia ajuda a diferenciar."],
      pearl: "a combinação de capilarite (hemácias extravasadas, hemossiderina) com um infiltrado liquenoide é a assinatura da púrpura de Gougerot-Blum, sem a necrose fibrinoide da vasculite.",
    },
  },
  {
    match: /urticária plenamente desenvolvida/i,
    exclusive: true,
    replaceDefaults: true,
    data: {
      concept: [
        <>Reação cutânea mediada principalmente por <Highlight>mastócitos</Highlight>: a liberação de histamina aumenta a permeabilidade das vênulas pós-capilares e produz <Highlight>edema transitório da derme superficial</Highlight>.</>,
        <>Na lesão plenamente desenvolvida, o edema se associa a <Highlight>infiltrado inflamatório misto</Highlight>, sem dano verdadeiro da parede vascular.</>,
      ],
      clinical: [
        <>As urticas são <Highlight>pruriginosas</Highlight>, róseas ou pálidas, elevadas e circundadas por <Highlight>halo eritematoso</Highlight>.</>,
        <>Cada lesão costuma desaparecer em <Highlight>menos de 24 horas</Highlight>, sem púrpura nem hiperpigmentação residual — pista clínica central.</>,
        <>O <Highlight>angioedema</Highlight> acomete derme profunda e subcutâneo, tende a ser mais doloroso que pruriginoso e pode persistir por <Highlight>2–3 dias</Highlight>.</>,
        <>Urticas recorrentes por <Highlight>mais de 6 semanas</Highlight> definem urticária crônica; revisar fármacos, infecções e sintomas sistêmicos.</>,
      ],
      histology: [
        <><Highlight>Epiderme sem alterações</Highlight>, edema da derme papilar e infiltrado geralmente <Highlight>escasso</Highlight>, superficial ou superficial e profundo; em pequeno aumento, a biópsia pode parecer pele normal.</>,
        <><Highlight>Fase inicial:</Highlight> linfócitos, neutrófilos e eosinófilos concentram-se <Highlight>ao redor das vênulas</Highlight>.</>,
        <><Highlight>Fase plenamente desenvolvida:</Highlight> neutrófilos e eosinófilos deixam o compartimento perivascular e ficam <Highlight>dispersos no interstício</Highlight>.</>,
        <><Highlight>Fase tardia:</Highlight> predominam linfócitos perivenulares, isoladamente ou acompanhados por <Highlight>eosinófilos residuais</Highlight>.</>,
        <>Pequenos agrupamentos de <Highlight>neutrófilos no lúmen vascular</Highlight> são uma pista útil; não deve haver necrose fibrinoide nem destruição da parede vascular.</>,
      ],
      evaluation: [
        <><Highlight>Vasculite urticariforme</Highlight>: lesões por mais de 24 horas, dor ou ardor, púrpura/hiperpigmentação residual e, na histologia, <Highlight>leucocitoclasia, extravasamento de hemácias e dano vascular</Highlight>.</>,
        <><Highlight>Dermatose urticariforme neutrofílica</Highlight>: neutrófilos intersticiais, perivasculares e perianexiais com poeira nuclear, porém sem vasculite; febre ou artralgia favorecem doença sistêmica associada.</>,
        <><Highlight>Penfigoide bolhoso pré-bolhoso</Highlight>: placas persistentes, prurido intenso e espongiose eosinofílica; se houver suspeita, colher <Highlight>biópsia perilesional para imunofluorescência direta</Highlight>.</>,
      ],
      pearl: <>A urticária pode parecer <Highlight>pele normal em pequeno aumento</Highlight>: procure edema papilar e <Highlight>neutrófilos no lúmen vascular</Highlight>. Um infiltrado misto denso favorece reação a artrópode ou síndrome de Wells, e o diagnóstico definitivo exige <Highlight>boa correlação clínica</Highlight>.</>,
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
    match: /morfeia|morfea/i,
    data: {
      clinical: ["Na fase inicial (borda inflamatória) predominam eritema e halo violáceo; a esclerose central se torna mais evidente com a evolução."],
      histology: [
        "Na borda inflamatória, vasos com tumefação endotelial e edema são circundados por infiltrado linfocitário (predomínio de linfócitos T CD4+), por vezes com eosinófilos, plasmócitos e mastócitos.",
        "A epiderme costuma ser normal, podendo haver achatamento das cristas; ainda não há espessamento colágeno evidente nesta fase.",
        "Com a progressão, o infiltrado diminui, os vasos se reduzem em número e feixes colágenos espessados e homogeneizados aprisionam os anexos.",
      ],
      evaluation: ["A biópsia deve ser profunda, incluindo tecido subcutâneo, e idealmente amostrar a borda inflamatória, já que as alterações mais características ocorrem na transição derme-hipoderme."],
      pearl: "a morfeia inicial pode parecer apenas um infiltrado linfoplasmocitário perivascular e perianexial; procure tumefação endotelial e amostre a hipoderme para não perder o diagnóstico.",
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
    match: /eritema multiforme|pigmentar fixo|GVHD|mão-pé-boca|herpes|Mpox|\bOrf\b|ordenhadores/i,
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
    match: /psoríase|pitiríase rubra pilar/i,
    data: {
      clinical: ["Distribuição, morfologia da escama, unhas e padrão linear ou folicular ajudam a separar as dermatoses psoriasiformes."],
      histology: ["Comparar regularidade das cristas, camada granular, paraceratose, neutrófilos e capilares papilares."],
      evaluation: ["Fungos e eczemas crônicos são simuladores frequentes; PAS pode ser útil em casos selecionados."],
      pearl: "o diagnóstico psoriasiforme nasce da combinação entre arquitetura epidérmica e padrão da camada córnea, não de um achado isolado.",
    },
  },
  {
    match: /NEVIL/i,
    exclusive: true,
    data: {
      clinical: ["Placa psoriasiforme linear ao longo das linhas de Blaschko, geralmente em um membro, com início antes dos 5 anos em cerca de 75% dos casos; costuma ser pruriginosa e muito persistente, resistindo às terapias usuais da psoríase."],
      histology: [
        "Hiperplasia psoriasiforme com cristas epidérmicas alongadas.",
        "Zonas amplas de paraceratose sem camada granular subjacente alternando-se abruptamente, na vertical, com áreas de ortoceratose e hipergranulose — o achado mais característico.",
        "Exocitose de linfócitos e neutrófilos na epiderme espongiótica e papilomatosa; microabscessos de Munro podem estar presentes.",
      ],
      evaluation: ["Diferenciar de psoríase linear/nevoide (pode ter placas de psoríase clássica associadas) e de nevo epidérmico liquenoide; a distribuição em Blaschko, o início precoce e a resistência terapêutica favorecem NEVIL."],
      pearl: "a alternância vertical abrupta entre paraceratose sem granulosa e ortoceratose com hipergranulose, numa placa linear blaschkoide resistente a tratamento, é a assinatura do NEVIL.",
    },
  },
  {
    match: /poroceratose|poroqueratose/i,
    exclusive: true,
    data: {
      concept: [
        "Distúrbio de queratinização (não uma dermatite de interface verdadeira) causado por um clone de queratinócitos mutados que se expande centrifugamente.",
        "A lamela cornoide, correlato histológico da rima clínica elevada, define o espectro; pode mostrar um discreto infiltrado liquenoide central, motivo pelo qual aparece neste ramo do algoritmo.",
      ],
      clinical: ["Placa ou pápula com rima ceratótica fina e elevada (correlato clínico da lamela cornoide); a variante disseminada actínica (DSAP) é a mais comum, em áreas fotoexpostas de extremidades."],
      histology: [
        "Lamela cornoide: coluna fina de paraceratose compacta que se origina de uma invaginação epidérmica e frequentemente se projeta acima da superfície córnea adjacente — achado obrigatório para o diagnóstico.",
        "Sob a lamela cornoide, a camada granulosa está ausente ou muito atenuada, com queratinócitos disceratóticos/picnóticos no estrato espinhoso subjacente.",
        "A derme mostra linfócitos perivasculares, por vezes concentrados sob a lamela cornoide ou com padrão liquenoide na porção central da lesão.",
      ],
      evaluation: ["Diferenciar de ceratose actínica (que também pode ter lamela cornoide, mas com atipia ceratinocítica) e de verruga vulgar (paraceratose em montículos, com coilocitose); a biópsia deve incluir a borda elevada."],
      pearl: "a lamela cornoide — paraceratose compacta sobre camada granulosa ausente, com disceratose subjacente — é o achado obrigatório; sem atipia, isso afasta ceratose actínica.",
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
  {
    match: /pseudolinfoma|linfocitoma/i,
    exclusive: true,
    data: {
      concept: ["Reação linfoproliferativa reacional (benigna), não uma neoplasia; representa resposta exagerada a um estímulo antigênico, muitas vezes não identificado."],
      clinical: ["Nódulo ou placa firme, eritemato-violácea, geralmente única, de 1 a 3 cm, mais comum em face e tronco superior; pesquisar picada de artrópode, tatuagem, implante metálico, alérgeno de contato, vacina ou fármaco (anticonvulsivantes, anti-hipertensivos, entre outros) e infecção por Borrelia."],
      histology: [
        "Infiltrado nodular ou difuso, superficial e profundo, misto: linfócitos, histiócitos, plasmócitos e eosinófilos; em casos floridos, centros germinativos reativos com macrófagos de corpos tingíveis, zona do manto preservada e polarização clara/escura dos folículos.",
        "Padrão de células T predominante mostra linfócitos CD4+ com CD8+ minoritários e população B acompanhante; pode haver epidermotropismo simulando micose fungoide, mas sem fibrose papilar proeminente.",
      ],
      evaluation: ["Imunofenotipagem (policlonal, não monoclonal) e estudo de rearranjo de genes de Ig/TCR ajudam a diferenciar de linfoma cutâneo; a correlação clínica e o seguimento longitudinal são decisivos, já que clonalidade isolada não estabelece malignidade."],
      pearl: "centros germinativos reativos com manto preservado, polarização clara/escura e infiltrado misto (linfócitos, plasmócitos, eosinófilos) favorecem pseudolinfoma; monoclonalidade e ausência dessas características sustentam linfoma cutâneo.",
    },
  },
  {
    match: /linfomas? cutâneo|linfócitos anormais/i,
    exclusive: true,
    data: {
      concept: ["Proliferação linfoide clonal (neoplásica) da pele, de linhagem T (mais comum) ou B; a subclassificação depende de arquitetura, imunofenótipo e estudo de clonalidade."],
      clinical: ["Placas ou nódulos persistentes, muitas vezes de evolução lenta; a distribuição, o número de lesões e a presença de sintomas sistêmicos ajudam a orientar o subtipo."],
      histology: ["Densidade e monotonia do infiltrado, epidermotropismo desproporcional à espongiose, atipia citológica e alinhamento basal de linfócitos são sinais de alerta para malignidade, em contraste com a heterogeneidade celular e os centros germinativos reativos do pseudolinfoma."],
      evaluation: ["Imunofenotipagem completa e estudo de clonalidade (rearranjo de TCR ou de genes de Ig) são essenciais; biópsias seriadas podem ser necessárias quando o quadro inicial for equívoco."],
      pearl: "monotonia citológica e clonalidade, associadas à perda da arquitetura reativa (sem centros germinativos polarizados com manto preservado), separam o linfoma cutâneo do pseudolinfoma.",
    },
  },
  {
    match: /ausência de fibrina em parede de vênulas|síndrome de sweet|pioderma gangrenoso|dermatite neutrofílica reumatoide/i,
    exclusive: true,
    data: {
      concept: ["Grupo de dermatoses neutrofílicas reacionais (não infecciosas), frequentemente associadas a doenças sistêmicas — hematológicas, inflamatórias intestinais, autoimunes — ou a fármacos."],
      clinical: [
        "Síndrome de Sweet: pápulas/placas eritemato-edematosas dolorosas de início abrupto, com febre e leucocitose; associações com infecções, neoplasias hematológicas, doença inflamatória intestinal e fármacos (G-CSF, ATRA).",
        "Pioderma gangrenoso: úlcera de bordas violáceas solapadas, muitas vezes com patergia; associado a doença inflamatória intestinal, artrite reumatoide e neoplasias hematológicas.",
        "Dermatite neutrofílica reumatoide: pápulas/placas urticariformes persistentes e assintomáticas em superfícies extensoras, em paciente com artrite reumatoide soropositiva grave — quadro muito semelhante à síndrome de Sweet.",
      ],
      histology: ["Infiltrado neutrofílico dérmico denso, nodular e perivascular, sem necrose fibrinoide (leucocitoclasia com tumefação endotelial pode ocorrer, mas não configura vasculite); pode haver extensão ao subcutâneo formando paniculite septal ou lobular."],
      evaluation: ["Excluir infecção (cultura, colorações especiais) antes de assumir dermatose neutrofílica estéril; investigar neoplasia hematológica, doença inflamatória intestinal e artrite reumatoide subjacentes."],
      pearl: "um infiltrado neutrofílico dérmico denso sem necrose fibrinoide é a assinatura das dermatoses neutrofílicas; a distinção entre Sweet, PG e dermatite reumatoide depende muito mais do contexto clínico e sistêmico do que da histologia isolada.",
    },
  },
  {
    match: /dermatite nodular\/difusa supurativa|hidradenite supurativa|acne conglobata|acne queloidiana|celulite dissecante|cistos rotos/i,
    exclusive: true,
    data: {
      concept: ["Tétrade de oclusão folicular: hidradenite supurativa, acne conglobata, celulite dissecante do couro cabeludo e cisto/sinus pilonidal compartilham a hiperqueratinização e oclusão do infundíbulo folicular como evento inicial, com posterior ruptura e reação inflamatória supurativa."],
      clinical: ["Hidradenite supurativa: nódulos dolorosos recorrentes, abscessos, trajetos fistulosos e cicatrizes em áreas intertriginosas (axilas, região anogenital, submamária); comedões double-ended são uma pista característica."],
      histology: ["Dilatação e hiperqueratinização folicular com ruptura e infiltrado inflamatório misto dérmico (e por vezes subcutâneo), abscessos, trajetos sinusais com debris queratinoso e, na doença crônica, fibrose extensa com destruição de folículos e glândulas sudoríparas."],
      evaluation: ["Diferenciar de cistos epidermoides, furunculose estafilocócica e doença de Crohn cutânea; a ausência de comedões double-ended e o acometimento facial favorecem outros diagnósticos."],
      pearl: "dilatação/ruptura folicular seguida de trajetos sinusais fibróticos, em topografia intertriginosa com comedões double-ended, define a hidradenite supurativa e o espectro da tétrade de oclusão folicular.",
    },
  },
  {
    match: /granuloma anular/i,
    exclusive: true,
    data: {
      concept: ["Dermatite granulomatosa em paliçada definida pela presença de mucina — o achado central que a separa das demais paliçadas (necrobiose lipoídica, xantogranuloma necrobiótico, nódulo reumatoide)."],
      clinical: ["Pápulas ou placas anulares/arciformes, cor da pele a violáceas, tipicamente no dorso das mãos/pés; formas subcutâneas (nódulos profundos, mais comuns em crianças) podem simular nódulo reumatoide, e a forma perfurante mostra eliminação transepidérmica."],
      histology: [
        "Padrão intersticial (mais comum): histiócitos dispersos entre os feixes colágenos, com discreta degeneração do colágeno e mucina granular basofílica entre os feixes (realçada por Alcian blue/ferro coloidal).",
        "Padrão em paliçada: um ou mais granulomas com degeneração central do colágeno circundados por histiócitos e linfócitos em paliçada, com mucina abundante no centro; fibrina, neutrófilos e poeira nuclear podem estar presentes.",
        "A forma subcutânea é uma paniculite septal com granulomas em paliçada, sem padrão intersticial associado — histologicamente pode ser indistinguível do nódulo reumatoide.",
      ],
      evaluation: ["Usar ao menos duas colorações de mucina (Alcian blue e ferro coloidal) para aumentar a sensibilidade; no diagnóstico diferencial com nódulo reumatoide, fator reumatoide e anti-CCP ajudam a identificar risco de doença articular — o nódulo reumatoide mostra fibrina, não mucina."],
      pearl: "mucina entre os feixes colágenos (intersticial) ou no centro do granuloma em paliçada é a chave do granuloma anular; sem ela, pense em necrobiose lipoídica (colágeno em camadas), xantogranuloma necrobiótico (fendas de colesterol) ou nódulo reumatoide (fibrina).",
    },
  },
  {
    match: /necrobiose lipoídica|necrobiose lipoidica/i,
    exclusive: true,
    data: {
      concept: ["Dermatite granulomatosa em paliçada com forte associação a diabetes mellitus (15–65% dos casos), sem mucina significativa — o achado que a distingue do granuloma anular."],
      clinical: ["Placas violáceas de bordas elevadas com centro atrófico amarelo-acastanhado e telangiectasias, classicamente na região pré-tibial; pode ulcerar após trauma; hipoestesia local pode ocorrer por dano neural."],
      histology: [
        "Dermatite granulomatosa em paliçada e intersticial que acomete toda a derme e estende-se aos septos do subcutâneo, com \"camadas\" horizontais de colágeno degenerado alternando com histiócitos (muitos multinucleados).",
        "Infiltrado perivascular superficial e profundo predominantemente linfocitário, frequentemente com plasmócitos; tumefação endotelial e hialinização vascular mais proeminentes que no granuloma anular.",
        "Ausência de mucina significativa no centro dos granulomas — principal diferença histológica em relação ao granuloma anular.",
      ],
      evaluation: ["Diferenciar de granuloma anular (tem mucina, não tem o padrão em camadas), xantogranuloma necrobiótico (fendas de colesterol abundantes, gamopatia monoclonal associada) e sarcoidose (sem a atrofia/telangiectasias típicas)."],
      pearl: "colágeno degenerado em camadas horizontais, sem mucina significativa, associado a plasmócitos perivasculares, distingue a necrobiose lipoídica do granuloma anular — pense sempre em rastrear diabetes mellitus.",
    },
  },
  {
    match: /xantogranuloma necrobiótico/i,
    exclusive: true,
    data: {
      concept: ["Histiocitose não-Langerhans multissistêmica rara, fortemente associada a gamopatia monoclonal IgG (até 80% dos casos, por discrasia plasmocitária ou doença linfoproliferativa B)."],
      clinical: ["Placas e nódulos indurados de coloração amarelada, mais comuns na região periorbital, podendo ulcerar; investigar hepatoesplenomegalia, manifestações oftalmológicas e eletroforese de proteínas séricas/imunofixação para gamopatia monoclonal."],
      histology: ["Granuloma em paliçada na derme média estendendo-se ao panículo, com histiócitos, células espumosas, plasmócitos, nódulos linfoides e áreas de degeneração colágena (\"necrobiose\") com fendas de colesterol; células gigantes de Touton e células gigantes bizarras de corpo estranho são achado proeminente."],
      evaluation: ["Rastrear gamopatia monoclonal (eletroforese/imunofixação), hepatoesplenomegalia e envolvimento oftalmológico; diferenciar de necrobiose lipoídica (sem fendas de colesterol tão abundantes) e xantelasma/xantomas planos normolipêmicos."],
      pearl: "fendas de colesterol abundantes na necrobiose associadas a células de Touton e células gigantes bizarras, numa placa periorbital amarelada, devem levar à pesquisa de gamopatia monoclonal IgG.",
    },
  },
  {
    match: /nódulo reumatoide|nodulo reumatoide/i,
    exclusive: true,
    data: {
      concept: ["Dermatite granulomatosa em paliçada com núcleo de fibrina (não mucina), presente em ~20% dos pacientes com artrite reumatoide, geralmente com títulos moderados a altos de fator reumatoide."],
      clinical: ["Nódulos firmes, semimóveis, em localização periarticular sobre superfícies extensoras e áreas de pressão/trauma, geralmente assintomáticos; nodulose acelerada pode surgir após início de metotrexato."],
      histology: ["Localizado na derme profunda/subcutâneo: zona central de fibrina intensamente eosinofílica circundada por paliçada de histiócitos e tecido de granulação; lesões precoces podem mostrar vasculite leucocitoclástica e infiltrado neutrofílico intersticial."],
      evaluation: ["Diferenciar de granuloma anular subcutâneo (mucina, não fibrina; paciente geralmente uma criança saudável) e de tofo gengoso (fendas em agulha, birrefringência negativa) — a ultrassonografia mostra área central ecodensa no nódulo reumatoide versus espaço claro central no tofo."],
      pearl: "fibrina eosinofílica central (não mucina) circundada por paliçada histiocitária, em paciente com fator reumatoide elevado, define o nódulo reumatoide; mucina aponta para granuloma anular subcutâneo.",
    },
  },
  {
    match: /granuloma tuberculoide|diagnósticos infecciosos e afins/i,
    data: {
      clinical: ["Granuloma bem formado (epitelioide, com células gigantes de Langhans) sem necrose caseosa identificável ou organismo demonstrado à rotina — um padrão morfológico, não um diagnóstico etiológico fechado."],
      histology: ["Correlacionar a presença ou ausência de necrose caseosa, plasmócitos e alterações vasculares com a hipótese etiológica antes de tentar o fechamento diagnóstico."],
      evaluation: ["Pesquisar organismos com colorações dirigidas (Fite/Ziehl-Neelsen para micobactérias, PAS/Grocott para fungos, Warthin-Starry para espiroquetas) e considerar PCR/cultura quando a rotina for negativa; manter tuberculose, sífilis secundária, leishmaniose crônica, brucelose e micobacterioses profundas no diferencial."],
      pearl: "diante de um granuloma tuberculoide sem organismo demonstrável, mantenha o diagnóstico como padrão morfológico e persiga ativamente colorações especiais e correlação clínico-epidemiológica antes de assumir uma causa idiopática.",
    },
  },
  {
    match: /\bgota\b/i,
    exclusive: true,
    data: {
      concept: ["Doença por depósito de cristais de urato monossódico, decorrente de hiperuricemia; a gota tofácea crônica é a manifestação cutânea, surgindo em média 10 anos após o início da artrite gotosa."],
      clinical: ["Tofos: pápulas/nódulos dérmicos ou subcutâneos firmes, de contorno liso ou multilobulado, cor da pele a branco-amarelada, mais comuns sobre articulações e na hélice auricular; podem ulcerar com drenagem de material calcário esbranquiçado."],
      histology: ["Depósitos amorfos com fendas em agulha (correspondentes aos cristais dissolvidos pela fixação em formalina) circundados por infiltrado granulomatoso com células gigantes multinucleadas; pode haver calcificação secundária em lesões antigas."],
      evaluation: ["Fixar em solução à base de álcool (líquido de Carnoy) para preservar os cristais; birrefringência negativa à luz polarizada em preparações a fresco confirma o diagnóstico. Diferenciar de xantomas, nódulo reumatoide (fibrina) e calcinose cutânea — a ultrassonografia mostra espaço central claro no tofo versus área ecodensa central no nódulo reumatoide."],
      pearl: "fendas em agulha (não fibrina, não mucina) com birrefringência negativa à luz polarizada definem o tofo gotoso; a fixação em formalina de rotina dissolve os cristais, deixando apenas as fendas como pista.",
    },
  },
  {
    match: /urticária pigmentosa/i,
    exclusive: true,
    data: {
      concept: ["Mastocitose cutânea: acúmulo de mastócitos na pele, não uma urticária verdadeira, apesar do nome."],
      clinical: ["Sinal de Darier (urticação ao atrito) é característico; em crianças, trauma mecânico sobre a lesão pode desencadear edema e até bolha por degranulação maciça de mastócitos."],
      histology: ["Aumento do número de mastócitos na derme (arredondados em crianças, fusiformes/dendríticos em adultos), por vezes com eosinófilos acompanhantes; hiperpigmentação basal e melanófagos são comuns."],
      evaluation: ["Colorações de azul de toluidina, Giemsa ou imuno-histoquímica para CD117/triptase confirmam os mastócitos; triptase sérica e pesquisa de mutação KIT ajudam a rastrear acometimento sistêmico quando indicado."],
      pearl: "uma bolha em criança com mastocitose reflete degranulação mastocitária por trauma mecânico (sinal de Darier), não um processo bolhoso primário — a densidade aumentada de mastócitos na derme confirma o diagnóstico.",
    },
  },
  {
    match: /\bvaricela\b/i,
    exclusive: true,
    data: {
      clinical: ["Lesões em todos os estágios evolutivos simultaneamente (mácula → pápula → vesícula em \"gota de orvalho sobre pétala de rosa\" → pústula → crosta) é o achado clínico mais característico, com distribuição centrípeta e frequente acometimento da mucosa oral."],
      histology: ["Histologicamente idêntica ao herpes simples/zoster: balonização de queratinócitos, células multinucleadas e núcleos em \"aço-cinza\" com marginação de cromatina."],
      evaluation: ["A histologia não diferencia VZV de HSV; imuno-histoquímica ou PCR são necessários quando a distinção viral for relevante."],
      pearl: "lesões em múltiplos estágios evolutivos simultâneos é a pista clínica que mais separa a varicela de outras erupções vesiculares — a histologia sozinha não distingue VZV de HSV.",
    },
  },
  {
    match: /impetigo bolhoso/i,
    exclusive: true,
    data: {
      clinical: ["Bolhas flácidas superficiais, mais comuns em neonatos e crianças, que se rompem com facilidade deixando um colarete de escama sem crosta espessa."],
      histology: ["Clivagem na camada granulosa por ação das toxinas esfoliativas estafilocócicas (ETA/ETB), que clivam a desmogleína 1 — acantólise que mimetiza o pênfigo foliáceo; poucas células inflamatórias na cavidade da bolha, com neutrófilos na derme superior; cocos Gram-positivos podem ser vistos na bolha."],
      evaluation: ["Cultura do líquido da bolha confirma S. aureus; diferenciar de SSSS (toxina disseminada hematogenicamente, sem bactérias na pele) e de pênfigo foliáceo (sem bactérias, IFD positiva)."],
      pearl: "impetigo bolhoso, SSSS e pênfigo foliáceo compartilham a mesma clivagem alta na epiderme porque todos têm a desmogleína 1 como alvo — a presença de bactérias na bolha e o contexto infeccioso definem o impetigo.",
    },
  },
  {
    match: /doença de darier/i,
    exclusive: true,
    data: {
      concept: ["Genodermatose por mutação em ATP2A2 (SERCA2), com disfunção da bomba de cálcio do retículo endoplasmático prejudicando a adesão célula-célula."],
      clinical: ["Pápulas ceratósicas malcheirosas em distribuição seborreica, piorando com calor, suor e luz UV; papilas palmares puntiformes e unhas com estrias longitudinais vermelhas e brancas com entalhe em V distal são pistas adicionais."],
      histology: ["Acantólise suprabasal associada a disceratose: \"corpos redondos\" (corps ronds) na camada malpighiana e \"grãos\" (grains) na camada córnea; epiderme espessada com papilomatose e hiperceratose."],
      evaluation: ["Diferenciar da doença de Grover (achados mais focais, mais eosinófilos, menos disceratose) e da doença de Hailey-Hailey (acantólise mais difusa em \"parede de tijolos em ruínas\", sem disceratose proeminente); os achados diagnósticos costumam ser focais — procure cuidadosamente."],
      pearl: "acantólise suprabasal com disceratose (corpos redondos e grãos) é a assinatura da doença de Darier; quanto mais extensa e menos disceratótica a lesão, mais se aproxima de Grover ou Hailey-Hailey.",
    },
  },
  {
    match: /doença de grover/i,
    exclusive: true,
    data: {
      concept: ["Dermatose acantolítica transitória (por vezes persistente), típica de homens brancos acima de 40 anos com fotodano importante."],
      clinical: ["Pápulas pruriginosas, muitas vezes crostosas, no tronco, poupando a pele fotoprotegida; piora com calor, suor e, por vezes, fricção."],
      histology: ["Quatro padrões histológicos, às vezes combinados: semelhante a Darier, semelhante a Hailey-Hailey, semelhante a pênfigo vulgar/foliáceo, e espongiose com acantólise mínima."],
      evaluation: ["Imunofluorescência negativa (exclui pênfigo); achados focais e o contexto clínico (fotodano, calor/suor) ajudam a diferenciar de Darier e Hailey-Hailey, que tendem a ter achados mais extensos e características adicionais (unhas, mucosas)."],
      pearl: "quando a histologia lembra Darier ou Hailey-Hailey mas os achados são focais numa placa pruriginosa do tronco de um homem idoso fotodanificado, pense em doença de Grover.",
    },
  },
  {
    match: /hailey-hailey/i,
    exclusive: true,
    data: {
      concept: ["Genodermatose autossômica dominante por mutação em ATP2C1, prejudicando a sinalização de cálcio no complexo de Golgi e a adesão celular no estrato espinhoso."],
      clinical: ["Vesículas flácidas e erosões em áreas intertriginosas (axilas, virilha), com vegetações úmidas malcheirosas e fissuras dolorosas; piora com calor, suor e fricção."],
      histology: ["Acantólise ampla no estrato espinhoso, descrita como \"parede de tijolos em ruínas\"; papilas dérmicas revestidas por uma única camada de células basais projetando-se para a cavidade (\"vilosidades\"); queratinócitos necróticos são incomuns, ao contrário da doença de Darier."],
      evaluation: ["IFD negativa (exclui pênfigo); diferenciar de candidíase/intertrigo clinicamente e da doença de Darier pela acantólise mais difusa e ausência de disceratose proeminente."],
      pearl: "acantólise difusa em \"parede de tijolos em ruínas\" com vilosidades papilares, em área intertriginosa e sem disceratose proeminente, define a doença de Hailey-Hailey.",
    },
  },
  {
    match: /pênfigo foliáceo/i,
    data: {
      histology: ["Acantólise superficial, na camada granulosa ou próxima a ela, com células acantolíticas frequentemente em formato de amêndoa ou fuso; histologicamente indistinguível de SSSS e impetigo bolhoso, já que todos têm a desmogleína 1 como alvo."],
      evaluation: ["IFD com padrão intercelular de IgG/C3 confirma o diagnóstico e diferencia de SSSS/impetigo bolhoso, nos quais a IFD é negativa."],
      pearl: "acantólise alta, próxima à camada granulosa, com IFD intercelular positiva, diferencia o pênfigo foliáceo de SSSS e impetigo bolhoso, que têm a mesma clivagem mas IFD negativa.",
    },
  },
  {
    match: /pênfigo cicatricial/i,
    exclusive: true,
    data: {
      concept: ["Dermatose bolhosa autoimune subepitelial (penfigoide de membranas mucosas), mediada por autoanticorpos contra componentes da junção dermoepidérmica, com tendência a cicatrizar."],
      clinical: ["Gengivite descamativa e erosões orais crônicas, além de conjuntivite cicatricial que pode evoluir para simbléfaro e cegueira; a pele é acometida em apenas 20-35% dos casos, geralmente couro cabeludo, face, pescoço e tronco superior (variante de Brunsting-Perry)."],
      histology: ["Bolha subepitelial/subepidérmica sem acantólise, com infiltrado misto de predomínio neutrofílico (menos eosinófilos que no penfigoide bolhoso); lesões antigas mostram fibrose na submucosa ou derme superior."],
      evaluation: ["IFD mostra depósitos lineares de IgG, IgA e/ou C3 na junção dermoepidérmica; diferenciar do penfigoide bolhoso (mais eosinófilos, menos cicatriz) e do pênfigo vulgar (acantólise, padrão intercelular na IFD)."],
      pearl: "predomínio de neutrófilos sobre eosinófilos numa bolha subepitelial mucosa que cicatriza é a assinatura do penfigoide de membranas mucosas (pênfigo cicatricial).",
    },
  },
  {
    match: /penfigoide bolhoso(?!\s+urticariforme)|herpes gestationis/i,
    data: {
      clinical: ["A fase não bolhosa, com prurido intenso e lesões inespecíficas (eczematosas, papulares ou urticariformes), pode preceder em semanas a meses a fase bolhosa clássica com bolhas tensas; a \"gestational pemphigoid\" (herpes gestationis) é uma variante do penfigoide bolhoso que ocorre na gravidez."],
      histology: ["Bolha subepidérmica com infiltrado dérmico rico em eosinófilos, mais proeminente na derme superior; na fase inicial pode haver apenas espongiose eosinofílica, sem bolha franca."],
      evaluation: ["IFD com depósitos lineares contínuos de IgG e/ou C3 na junção dermoepidérmica em padrão \"n-serrilhado\", que diferencia do padrão \"u-serrilhado\" da epidermólise bolhosa adquirida."],
      pearl: "espongiose eosinofílica na fase inicial, ou infiltrado eosinofílico subepidérmico rico numa bolha tensa, com depósito linear de IgG/C3 n-serrilhado na junção dermoepidérmica, define o penfigoide bolhoso — a gestational pemphigoid é sua variante gravídica.",
    },
  },
  {
    match: /pênfigo vulgar(?!\s+urticariforme)/i,
    data: {
      histology: ["Acantólise suprabasal com aspecto de \"fileira de lápides\" (tombstones): as células basais mantêm adesão à membrana basal via hemidesmossomos, mas perdem contato lateral entre si; poucas células acantolíticas na cavidade da bolha, eosinófilos podem estar presentes."],
      evaluation: ["IFD com padrão intercelular de IgG/C3 confirma o diagnóstico; diferenciar do pênfigo paraneoplásico (necrose de queratinócitos e interface associadas) e do pênfigo foliáceo (clivagem mais superficial)."],
      pearl: "acantólise suprabasal em \"fileira de lápides\", com IFD intercelular positiva, define o pênfigo vulgar; a presença de necrose de queratinócitos e interface associada sugere pênfigo paraneoplásico.",
    },
  },
  {
    match: /epidermólise bolhosa/i,
    data: {
      concept: ["Grupo de doenças (herdadas ou adquiridas) da fragilidade dermoepidérmica; a forma adquirida (EBA) é autoimune, mediada por autoanticorpos contra o colágeno tipo VII das fibrilas de ancoragem."],
      clinical: ["A forma mecanobolhosa clássica de EBA mimetiza a epidermólise bolhosa distrófica herdada — bolhas em áreas de trauma (cotovelos, joelhos, dorso das mãos) cicatrizando com múltiplos milios e distrofia ungueal; formas inflamatórias mimetizam o penfigoide bolhoso ou o penfigoide de mucosas."],
      histology: ["Bolha subepidérmica; na forma mecanobolhosa não inflamatória, o infiltrado é mínimo ou ausente; nas formas inflamatórias, há infiltrado misto com neutrófilos, eosinófilos e linfócitos."],
      evaluation: ["Na EBA, a IFD mostra depósitos de IgG na junção dermoepidérmica em padrão \"u-serrilhado\" (ao contrário do \"n-serrilhado\" do grupo penfigoide), localizados no lado dérmico da pele salino-clivada; diferenciar de formas hereditárias de epidermólise bolhosa (sem depósitos imunes) e de porfiria cutânea tarda."],
      pearl: "o padrão \"u-serrilhado\" dos depósitos de IgG na junção dermoepidérmica diferencia a epidermólise bolhosa adquirida do grupo penfigoide (n-serrilhado); a forma mecanobolhosa mimetiza a epidermólise bolhosa distrófica herdada.",
    },
  },
  {
    match: /\bcelulite\b(?!\s+dissecante)/i,
    exclusive: true,
    data: {
      concept: ["Infecção bacteriana da derme profunda e do subcutâneo, tipicamente por estreptococo do grupo A ou S. aureus."],
      clinical: ["Eritema mal delimitado, calor, dor e edema de instalação relativamente rápida, por vezes com sintomas sistêmicos (febre, calafrios); em infecções graves podem surgir vesículas, bolhas, pústulas ou necrose."],
      histology: ["Infiltrado inflamatório leve a moderado de linfócitos e neutrófilos na derme, por vezes estendendo-se ao subcutâneo; edema (podendo levar a bolha subepidérmica) e dilatação de vasos linfáticos e pequenos vasos sanguíneos."],
      evaluation: ["O diagnóstico é predominantemente clínico; hemoculturas raramente positivas em imunocompetentes. Diferenciar de \"pseudocelulite\" (picada de artrópode, eritema migrans, dermatite de estase, paniculite, síndrome de Sweet, entre outras)."],
      pearl: "a celulite raramente tem confirmação histológica ou microbiológica direta — o diagnóstico é predominantemente clínico, e a extensa lista de \"pseudocelulites\" deve sempre ser considerada antes de fechar o diagnóstico.",
    },
  },
  {
    match: /amiloidose bolhosa/i,
    exclusive: true,
    data: {
      concept: ["Manifestação bolhosa mais associada à amiloidose sistêmica (AL) do que às formas primárias localizadas cutâneas (macular/liquenoide), embora bolhas raras já tenham sido descritas nestas últimas."],
      histology: ["Depósitos amiloides homogêneos, eosinofílicos e fissurados na derme (e ao redor de vasos), confirmados por vermelho Congo (birrefringência verde-maçã sob luz polarizada), tioflavina T ou violeta cristal."],
      evaluation: ["Correlacionar com eletroforese de proteínas séricas/urinárias e considerar biópsia de gordura abdominal para rastrear amiloidose sistêmica quando a bolha for a manifestação inicial."],
      pearl: "uma bolha com depósitos amiloides na derme deve levantar suspeita de amiloidose sistêmica (AL), e não apenas de uma forma cutânea localizada.",
    },
  },
  {
    match: /papilas dérmicas preservadas com material homogêneo perivenular|porfiria cutânea tarda|porfiria variegata|porfiria eritropoiética/i,
    exclusive: true,
    data: {
      concept: ["Grupo de doenças por deficiência enzimática na via de síntese do heme, levando a acúmulo de porfirinas fotossensibilizantes; a porfiria cutânea tarda é a mais comum mundialmente."],
      clinical: ["Fragilidade cutânea, bolhas e erosões em áreas fotoexpostas (dorso das mãos), com milios, cicatrizes, hiperpigmentação e hipertricose associadas."],
      histology: ["Bolha subepidérmica pobre em células inflamatórias, com \"festonamento\" característico das papilas dérmicas, por depósito de material PAS-positivo ao redor dos vasos da derme superior."],
      evaluation: ["Dosar porfirinas urinárias, fecais e plasmáticas para confirmar e subclassificar (porfiria cutânea tarda, variegata, eritropoiética, entre outras); diferenciar de epidermólise bolhosa adquirida e de pseudoporfiria induzida por drogas."],
      pearl: "bolha subepidérmica pobre em células com festonamento papilar é muito sugestiva de porfiria cutânea — sempre dosar porfirinas antes de fechar o diagnóstico.",
    },
  },
  {
    match: /eritema nodoso(?!\s+hansênico)/i,
    exclusive: true,
    data: {
      concept: ["Protótipo de paniculite septal; a mais comum e mais conhecida das paniculites, considerada uma reação de hipersensibilidade tardia a diversos estímulos antigênicos."],
      clinical: ["Nódulos eritematosos, dolorosos, bilaterais, mais frequentes na região pré-tibial; diferente de outras paniculites, não ulcera; pode haver febre, artralgia e mal-estar. Causas comuns: idiopática, infecção estreptocócica, sarcoidose (síndrome de Löfgren) e doença inflamatória intestinal (mais Crohn que colite ulcerativa)."],
      histology: ["Paniculite septal com septos edemaciados e infiltrado linfocitário discreto nas lesões iniciais (neutrófilos podem predominar nesta fase); não há vasculite verdadeira. Microgranulomas de Miescher — pequenos agregados de histiócitos ao redor de neutrófilos ou fendas — são um achado característico, embora não patognomônico."],
      evaluation: ["Investigar foco infeccioso (estreptococo, especialmente de vias aéreas superiores), sarcoidose e doença inflamatória intestinal; a presença de úlcera afasta eritema nodoso e sugere paniculite pancreática ou eritema indurado."],
      pearl: "paniculite septal com edema, microgranulomas de Miescher e ausência de ulceração define o eritema nodoso — a presença de vasculite ou de necrose com saponificação deve levantar outros diagnósticos.",
    },
  },
  {
    match: /eritema indurado/i,
    exclusive: true,
    data: {
      concept: ["Sinônimo de vasculite nodular; paniculite lobular ou mista com vasculite de vaso médio, classicamente associada à tuberculose (Bazin), mas também idiopática ou ligada a outros agentes infecciosos/drogas."],
      clinical: ["Nódulos ou placas eritemato-violáceas, tipicamente na face posterior das pernas de mulheres jovens a de meia-idade, podendo ulcerar e drenar; recorrente e cicatriza com marcas residuais."],
      histology: ["Paniculite predominantemente lobular ou mista septal/lobular com infiltrado misto (neutrófilos, linfócitos, macrófagos, células gigantes multinucleadas); vasculite identificável na maioria dos casos, envolvendo veias ou artérias dos septos e vênulas dos lóbulos; necrose caseosa/coagulativa e granulomas em paliçada podem ocorrer, mais frequentes quando há DNA micobacteriano detectável."],
      evaluation: ["Pesquisar Mycobacterium tuberculosis por PCR nas lesões e investigar tuberculose sistêmica (PPD, IGRA); diferenciar de paniculite infecciosa (mais neutrofílica, necrose sudorípara, organismos identificáveis), paniculite lúpica (menos granulomatosa, mais linfoplasmocitária) e de PAN/tromboflebite (inflamação limitada à zona perivascular imediata, sem a paniculite lobular extensa do eritema indurado)."],
      pearl: "vasculite de vaso médio associada a paniculite lobular ou mista, na face posterior da perna, define o eritema indurado (vasculite nodular) — sempre pesquisar M. tuberculosis por PCR.",
    },
  },
  {
    match: /eritema nodoso hansênico/i,
    exclusive: true,
    data: {
      concept: ["Reação tipo 2 da hanseníase (eritema nodoso hansênico, ENH), mediada por imunocomplexos, ocorrendo predominantemente na forma lepromatosa ou borderline-lepromatosa."],
      clinical: ["Pápulas eritematosas e nódulos subcutâneos dolorosos, ocasionalmente com pústulas, bolhas ou úlceras; acompanhados de sintomas sistêmicos (febre, artralgias); pode ser desencadeado pelo início do tratamento antimicobacteriano."],
      histology: ["Vasculite de pequenos vasos cutânea e por vezes sistêmica, com infiltrado neutrofílico rico, mediada por depósito de imunocomplexos; pesquisar bacilos (Fite-Faraco ou Ziehl-Neelsen) no infiltrado dérmico/subcutâneo de fundo."],
      evaluation: ["Diferenciar do fenômeno de Lúcio (trombose e vasculite necrosante associada a anticorpos antifosfolipídeo, sem o predomínio neutrofílico imunocomplexo-mediado do ENH) e de outras causas de paniculite neutrofílica."],
      pearl: "uma vasculite neutrofílica de pequenos vasos com sintomas sistêmicos, em paciente com hanseníase lepromatosa/borderline, define a reação tipo 2 (eritema nodoso hansênico) — não confundir com o fenômeno de Lúcio.",
    },
  },
  {
    match: /fenômeno de lúcio/i,
    exclusive: true,
    data: {
      concept: ["Estado reacional da hanseníase lepromatosa difusa (lepra de Lúcio, por Mycobacterium lepromatosis), tipicamente em pacientes da América Central/México."],
      clinical: ["Púrpura retiforme e úlceras necróticas, sem os nódulos típicos do eritema nodoso hansênico — reflexo de uma forma difusa e não nodular de hanseníase lepromatosa."],
      histology: ["Trombose associada a anticorpos antifosfolipídeo, com vasculopatia e/ou vasculite necrosante de pequenos vasos cutâneos; carga bacilar tipicamente elevada (bacilos abundantes à coloração de Fite-Faraco)."],
      evaluation: ["Diferenciar do eritema nodoso hansênico (reação tipo 2, imunocomplexo-mediada, com nódulos e sintomas sistêmicos, sem o predomínio trombótico); pesquisar anticorpos antifosfolipídeo e carga bacilar."],
      pearl: "púrpura retiforme com úlceras necróticas por trombose de pequenos vasos, em paciente com hanseníase lepromatosa difusa, define o fenômeno de Lúcio — distinto do eritema nodoso hansênico pelo mecanismo trombótico predominante.",
    },
  },
  {
    match: /lipodermatoesclerose/i,
    exclusive: true,
    data: {
      concept: ["Paniculite esclerosante associada a insuficiência venosa crônica; hipertensão venosa leva a aumento da permeabilidade capilar, formação de manguitos de fibrina perivascular e anóxia tecidual."],
      clinical: ["Fase aguda com dor, eritema e calor na face medial da perna acima do maléolo, frequentemente confundida com celulite infecciosa; fase crônica com induração bem demarcada e coloração acastanhada (hemossiderina), conferindo aspecto de \"garrafa de vinho invertida\"."],
      histology: ["Paniculite septal e lobular; lesões iniciais mostram necrose isquêmica médio-lobular, congestão e trombose capilar; lesões avançadas mostram esclerose septal acentuada e alteração membranocística característica (membranas onduladas formando cistos e configurações papilares, compostas de ceroide)."],
      evaluation: ["A persistência da lesão, a associação com sinais de estase e a ausência de resposta a antimicrobianos favorecem lipodermatoesclerose sobre celulite; diferenciar de morfea (envolvimento predominantemente septal, sem alteração membranocística tão proeminente) e evitar biópsia se o diagnóstico for clinicamente óbvio, pelo risco de má cicatrização."],
      pearl: "alteração membranocística (membranas onduladas formando cistos) na paniculite de uma perna com insuficiência venosa é a assinatura da lipodermatoesclerose — a fase aguda mimetiza celulite, mas não responde a antibióticos.",
    },
  },
  {
    match: /calcifilaxia/i,
    exclusive: true,
    data: {
      concept: ["Vasculopatia trombótica com calcificação da microvasculatura, classicamente em doença renal crônica dialítica, mas também descrita em pacientes não urêmicos."],
      clinical: ["Placas violáceas reticuladas com púrpura retiforme central, evoluindo para úlceras com escara necrótica; alta morbimortalidade."],
      histology: ["Depósito de cálcio na íntima de pequenos vasos do subcutâneo com trombos de fibrina, associado a isquemia e necrose da gordura, epiderme e derme sobrejacentes; paniculite lobular calcificante é achado comum. A coloração de von Kossa realça os depósitos de cálcio, mas o grau de calcificação histológica pode ser sutil mesmo com lesões clínicas exuberantes."],
      evaluation: ["A biópsia é o padrão-ouro, mas tem sensibilidade/especificidade limitadas e risco de complicações (ulceração); avaliar cálcio, fósforo e PTH, embora o produto cálcio×fósforo isolado não diferencie bem os casos."],
      pearl: "púrpura retiforme evoluindo para necrose em paciente com doença renal crônica sugere calcifilaxia; a calcificação vascular histológica pode ser sutil — a suspeita clínica deve permanecer alta mesmo sem depósitos evidentes de cálcio.",
    },
  },
  {
    match: /\boxalose\b/i,
    exclusive: true,
    data: {
      concept: ["Depósito de cristais de oxalato de cálcio na parede vascular, análogo à calcifilaxia, decorrente de hiperoxalúria primária (deficiência enzimática hepática) ou secundária (insuficiência renal, má absorção intestinal)."],
      histology: ["Cristais de oxalato de cálcio birrefringentes na parede de pequenos vasos do subcutâneo, com calcificação vascular associada, podendo levar a oclusão vascular e necrose gordurosa semelhante à calcifilaxia."],
      evaluation: ["Correlacionar com função renal, oxalato urinário/plasmático e causas de hiperoxalúria; a birrefringência sob luz polarizada ajuda a identificar os cristais."],
      pearl: "cristais birrefringentes na parede vascular do subcutâneo, num contexto de insuficiência renal ou hiperoxalúria, sugerem oxalose — histologicamente pode ser indistinguível da calcifilaxia sem atenção aos cristais.",
    },
  },
  {
    match: /paniculite pancreática/i,
    exclusive: true,
    data: {
      concept: ["Paniculite mista septal/lobular causada pela ação sistêmica de enzimas pancreáticas (lipase principalmente, também amilase e tripsina) sobre a gordura subcutânea."],
      clinical: ["Nódulos subcutâneos eritematosos, por vezes flutuantes e ulcerados com drenagem de material oleoso, associados a doença pancreática (pancreatite aguda/crônica, carcinoma acinar, pseudocisto); pode preceder o diagnóstico da doença pancreática em até vários meses. A tríade de Schmid (nódulos + poliartrite + eosinofilia) indica pior prognóstico."],
      histology: ["Necrose gordurosa com liquefação e formação de \"células fantasma\" (ghost cells) — adipócitos sem núcleo com parede espessada e sombria; saponificação da gordura por sais de cálcio, gerando depósito basofílico granular ou homogêneo; neutrófilos, eosinófilos ocasionais e células gigantes multinucleadas podem estar presentes."],
      evaluation: ["Dosar amilase e lipase séricas; a formação de \"ghost cells\" com saponificação diferencia de outras paniculites, exceto pela mucormicose (que também pode mostrar ghost cells) — pesquisar organismos quando houver dúvida."],
      pearl: "células fantasma (ghost cells) com saponificação basofílica da gordura por sais de cálcio definem a paniculite pancreática — sempre dosar amilase e lipase.",
    },
  },
  {
    match: /deficiência de alfa-1-antitripsina/i,
    exclusive: true,
    data: {
      concept: ["Paniculite causada pela ausência do principal inibidor de proteases séricas, permitindo ativação descontrolada de complemento, neutrófilos e suas enzimas proteolíticas sobre a gordura e o tecido conectivo; forma mais grave em homozigotos PiZZ."],
      clinical: ["Nódulos ou placas eritemato-purpúricas grandes e dolorosas, frequentemente ulceradas com drenagem, no tronco inferior e extremidades proximais (flancos, nádegas, coxas); trauma antecedente em até um terço dos casos; curso prolongado e resistente a imunossupressores."],
      histology: ["Paniculite neutrofílica precoce evoluindo rapidamente para necrose e destruição dos lóbulos gordurosos; neutrófilos dissecando entre feixes de colágeno na derme reticular é uma pista precoce; necrose liquefativa com separação dos lóbulos gordurosos dos septos adjacentes e \"áreas poupadas\" de gordura normal adjacentes a focos de necrose intensa são achados característicos."],
      evaluation: ["Dosar nível sérico de alfa-1-antitripsina e genotipagem (SERPINA1); diferenciar de paniculite factícia, paniculite infecciosa, paniculite pancreática e eritema indurado — todos podem ter neutrófilos e necrose, mas cada um com achados distintos. Investigar doença hepática, enfisema e vasculite ANCA associados."],
      pearl: "necrose liquefativa com neutrófilos dissecando o colágeno dérmico e septal, em nódulos ulcerados no tronco/proximal, deve levantar deficiência de alfa-1-antitripsina — dosar o nível sérico e genotipar.",
    },
  },
  {
    match: /esclerema neonatorum/i,
    exclusive: true,
    data: {
      concept: ["A gordura subcutânea do recém-nascido tem maior proporção de ácidos graxos saturados, favorecendo cristalização; o esclerema é a forma mais grave e difusa desse espectro, distinta da necrose gordurosa subcutânea localizada do RN."],
      clinical: ["Endurecimento difuso e rápido da pele em recém-nascidos prematuros e gravemente enfermos, poupando apenas genitália, palmas e solas; associado a hipotermia, sepse e outras comorbidades graves — mortalidade elevada."],
      histology: ["Fendas em agulha dentro dos lipócitos (não em células gigantes), com inflamação escassa a ausente — em contraste com a necrose gordurosa subcutânea do RN, que tem inflamação mais proeminente e fendas também em células gigantes."],
      evaluation: ["Diferenciar de escleredema neonatal (edema dérmico com mucina, sem os achados lipocitários) e de outras causas de endurecimento cutâneo difuso no período neonatal (stiff skin syndrome, dermatopatia restritiva, progeria)."],
      pearl: "fendas em agulha nos lipócitos com inflamação mínima, em recém-nascido prematuro gravemente enfermo com endurecimento cutâneo difuso, define o esclerema neonatorum — prognóstico reservado.",
    },
  },
  {
    match: /necrose gordurosa subcutânea do recém-nascido/i,
    exclusive: true,
    data: {
      concept: ["Processo localizado e autolimitado (ao contrário do esclerema neonatorum, que é difuso e grave), decorrente de estresse sobre a gordura fetal rica em ácidos graxos saturados."],
      clinical: ["Nódulos ou placas subcutâneas móveis, firmes, eritemato-violáceas em recém-nascidos a termo, geralmente nas primeiras 2-3 semanas de vida; pode associar-se a hipercalcemia (geralmente em até 2 meses do início) e trombocitopenia — monitorar cálcio sérico."],
      histology: ["Paniculite lobular granulomatosa com neutrófilos, linfócitos e macrófagos; fendas em agulha em arranjo radial dentro de lipócitos E de células gigantes (ao contrário do esclerema, restrito aos lipócitos); pode haver calcificação e hemorragia focais."],
      evaluation: ["Monitorar cálcio sérico por ao menos 2 meses após a resolução das lesões cutâneas; diferenciar de paniculite pós-esteroide, que é histologicamente idêntica mas ocorre em contexto clínico distinto (retirada de corticosteroide em criança maior)."],
      pearl: "fendas em agulha em arranjo radial dentro de lipócitos e células gigantes, num recém-nascido a termo com nódulos localizados, define a necrose gordurosa subcutânea do RN — sempre monitorar hipercalcemia.",
    },
  },
  {
    match: /paniculite pós-esteroide/i,
    exclusive: true,
    data: {
      concept: ["Complicação rara da retirada rápida de corticosteroide sistêmico em altas doses, histologicamente quase idêntica à necrose gordurosa subcutânea do recém-nascido, mas em contexto clínico distinto."],
      clinical: ["Nódulos eritematosos firmes na face, braços e tronco de crianças (1-14 anos, ocasionalmente adultos), surgindo 1 a 40 dias após a suspensão rápida de corticosteroide sistêmico em altas doses; resolução espontânea em meses."],
      histology: ["Paniculite lobular granulomatosa com linfócitos, macrófagos e células gigantes multinucleadas; fendas em agulha (por vezes em padrão \"estrela\") dentro de lipócitos e células gigantes."],
      evaluation: ["O contexto clínico (retirada recente de corticosteroide) é o principal diferenciador da necrose gordurosa subcutânea do RN, já que a histologia é praticamente idêntica; a reintrodução do corticosteroide com desmame mais gradual costuma ser eficaz."],
      pearl: "fendas em agulha em lipócitos e células gigantes, em criança que suspendeu corticosteroide sistêmico em altas doses recentemente, define a paniculite pós-esteroide — histologicamente idêntica à necrose gordurosa do RN, mas o contexto clínico as diferencia.",
    },
  },
  {
    match: /paniculite ao frio/i,
    exclusive: true,
    data: {
      concept: ["Paniculite por lesão direta do frio sobre a gordura subcutânea, favorecida pela maior proporção de ácidos graxos saturados no tecido adiposo de lactentes."],
      clinical: ["Nódulos eritemato-violáceos firmes após exposição ao frio — classicamente nas bochechas de lactentes (após picolé/chupeta gelada) ou nas coxas de amazonas jovens após cavalgar com roupas justas no frio."],
      histology: ["Inflamação septal/lobular, mais intensa na junção derme-subcutâneo e ao redor de anexos, com linfócitos, neutrófilos e macrófagos espumosos; ausência de fendas em agulha — achado-chave que a diferencia da necrose gordurosa subcutânea do recém-nascido."],
      evaluation: ["A história de exposição ao frio e a ausência de fendas em agulha na histologia distinguem a paniculite ao frio da necrose gordurosa subcutânea do RN."],
      pearl: "inflamação centrada na junção derme-subcutâneo sem fendas em agulha, após exposição ao frio, define a paniculite ao frio — a ausência de cristais é o que a separa da necrose gordurosa do RN.",
    },
  },
  {
    match: /lúpus eritematoso profundo|paniculite lúpica/i,
    exclusive: true,
    data: {
      concept: ["Paniculite lúpica (lupus profundus): subtipo de lúpus eritematoso cutâneo crônico: menos de 3% de todos os casos de LE cutâneo, associada a LE discoide em pelo menos um terço dos pacientes, mas a LE sistêmico em apenas 10-15%."],
      clinical: ["Nódulos e placas subcutâneas dolorosas na face, braços proximais, quadris e tronco, com relativa poupança das extremidades distais; frequentemente evolui com atrofia subcutânea significativa; pode preceder outras manifestações de LE em anos."],
      histology: ["Paniculite predominantemente lobular com necrose hialina (eosinofílica) dos lóbulos gordurosos — achado-chave; agregados nodulares de linfócitos (predomínio de células B) e plasmócitos, com grandes acúmulos de células dendríticas plasmocitoides CD123+; alterações epidérmicas/dérmicas de LE discoide sobrejacentes em 50-65% dos casos."],
      evaluation: ["O diagnóstico diferencial mais importante é o linfoma de células T subcutâneo símile paniculite (SPTCL): a presença de folículos linfoides, agregados de células B e células CD123+ favorece paniculite lúpica; atipia citológica, \"rimming\" de adipócitos por linfócitos e clonalidade de TCR favorecem SPTCL."],
      pearl: "necrose hialina dos lóbulos gordurosos com agregados linfoides (células B) e células CD123+ define a paniculite lúpica; atipia citológica e rimming de adipócitos por linfócitos devem levantar SPTCL.",
    },
  },
  {
    match: /paniculite da dermatomiosite/i,
    exclusive: true,
    data: {
      concept: ["Manifestação incomum de dermatomiosite; alterações microscópicas subclínicas do subcutâneo (sem lesão clínica evidente) parecem ser mais frequentes que a paniculite clinicamente aparente."],
      clinical: ["Placas e nódulos endurados e dolorosos, por vezes ulcerados, evoluindo com lipoatrofia; pode surgir em dermatomiosite já estabelecida ou ser a manifestação inicial da doença."],
      histology: ["Paniculite lobular ou mista com predomínio linfoplasmocitário; necrose gordurosa e alteração membranocística podem ocorrer; calcificação é variável; alteração vacuolar da camada basal da epiderme sobrejacente pode estar presente; IFD tipicamente negativa na junção dermoepidérmica (ao contrário da paniculite lúpica)."],
      evaluation: ["Diferenciar da paniculite lúpica, que mostra mais necrose hialina e agregados linfoides nodulares — a correlação clínico-laboratorial (enzimas musculares, achados cutâneos característicos de dermatomiosite) costuma ser necessária."],
      pearl: "paniculite lobular linfoplasmocitária com IFD negativa na junção dermoepidérmica, em paciente com achados de dermatomiosite, favorece paniculite da dermatomiosite sobre paniculite lúpica (que tende a ter IFD positiva e mais necrose hialina).",
    },
  },
  {
    match: /paniculite traumática/i,
    exclusive: true,
    data: {
      concept: ["Paniculite por lesão física direta da gordura subcutânea (trauma contuso, corpo estranho, substâncias injetadas), com achados histológicos variáveis conforme o agente causador."],
      clinical: ["Nódulos inflamados, por vezes hemorrágicos/equimóticos, em local de trauma identificável; história de trauma acidental, intencional (factícia) ou iatrogênico (injeções) deve ser pesquisada ativamente."],
      histology: ["Presença de material estranho birrefringente (polarização é útil), hematoma em organização, ou vacúolos de óleo (\"queijo suíço\") no lipogranuloma esclerosante; um nicho central de inflamação ou evidência de picada de agulha são pistas para o diagnóstico."],
      evaluation: ["Pesquisar material exógeno birrefringente ou vacuolizado; correlacionar com história de trauma, injeções cosméticas/terapêuticas ou automutilação."],
      pearl: "um nicho central de inflamação com material estranho birrefringente ou vacúolos lipídicos, num nódulo de localização compatível com trauma, define a paniculite traumática.",
    },
  },
  {
    match: /paniculite factícia/i,
    exclusive: true,
    data: {
      concept: ["Variante da paniculite traumática autoinduzida, por injeção ou introdução deliberada de material estranho na gordura subcutânea; pode refletir transtorno psiquiátrico subjacente."],
      clinical: ["Nódulos inflamados de localização atípica ou de difícil explicação clínica; paciente frequentemente nega manipulação ou autoinjeção, dificultando o diagnóstico."],
      histology: ["Corpos estranhos nos lóbulos gordurosos, por vezes com vacúolos vazios (material lipídico dissolvido no processamento) ou material birrefringente identificável à polarização."],
      evaluation: ["Polarização microscópica para identificar material exógeno; correlacionar com avaliação psiquiátrica quando a automutilação for suspeitada."],
      pearl: "corpos estranhos ou vacúolos inexplicados nos lóbulos gordurosos, sem outra causa aparente, devem levantar a suspeita de paniculite factícia.",
    },
  },
  {
    match: /paniculite infecciosa/i,
    exclusive: true,
    data: {
      concept: ["Paniculite causada por invasão direta de um agente infeccioso na gordura subcutânea (por inoculação direta ou via hematogênica), a distinguir do eritema nodoso (reação a um foco infeccioso à distância)."],
      clinical: ["Nódulos flutuantes que ulceram e drenam, mais comuns em pernas e pés, mas também nádegas, abdome, axilas; imunossupressão e diabetes mellitus são fatores predisponentes comuns, mas não universais."],
      histology: ["Paniculite mista septal/lobular com infiltrado neutrofílico proeminente, proliferação vascular, hemorragia e necrose envolvendo adipócitos, células inflamatórias e novelos écrinos; achados variam conforme o agente (ex.: padrão \"em rosquinha\" na febre Q, histiócitos espumosos com material basofílico em infecção por Stenotrophomonas)."],
      evaluation: ["Colorações especiais (Gram, PAS, Grocott, Ziehl-Neelsen/Fite) e cultura de tecido e secreção são essenciais para identificar o organismo; correlacionar com estado imunológico do paciente."],
      pearl: "necrose de adipócitos e de novelos écrinos com neutrófilos abundantes e proliferação vascular sugere paniculite infecciosa — sempre solicitar colorações especiais e cultura antes de assumir causa não infecciosa.",
    },
  },
  {
    match: /paniculite lobular neutrofílica/i,
    data: {
      clinical: ["Quando idiopática, deve-se investigar associação com síndrome de Sweet subcutânea e doença inflamatória intestinal antes de se firmar o diagnóstico."],
      histology: ["Infiltrado neutrofílico lobular predominante sem outros achados específicos (sem necrose com saponificação, sem vasculite de vaso médio, sem organismos identificáveis)."],
      evaluation: ["Excluir infecção, deficiência de alfa-1-antitripsina, paniculite pancreática e eritema indurado antes de considerar o quadro idiopático."],
      pearl: "paniculite lobular neutrofílica é um padrão de exclusão — descarte infecção, deficiência de alfa-1-antitripsina e paniculite pancreática antes de assumir uma causa idiopática ou associada a doença inflamatória intestinal/síndrome de Sweet.",
    },
  },
  {
    match: /paniculite histiocítica citofágica/i,
    exclusive: true,
    data: {
      concept: ["A maioria dos casos representa acometimento subcutâneo de linfoma (linfoma cutâneo primário de células T γ/δ ou linfoma NK/T extranodal EBV-associado, tipo nasal; ocasionalmente linfoma de células T subcutâneo símile paniculite); raros casos verdadeiramente não neoplásicos existem (ex.: mutação em perforina)."],
      clinical: ["Nódulos ou placas subcutâneas, por vezes com púrpura; pode evoluir com síndrome hemofagocítica sistêmica (febre, citopenias, hepatoesplenomegalia) mesmo nos casos sem linfoma demonstrável."],
      histology: ["Macrófagos com atividade citofágica (hemofagocitose) contendo hemácias, linfócitos e/ou debris cariorréticos — as chamadas células \"bean bag\"."],
      evaluation: ["Imunofenotipagem e estudo de clonalidade são obrigatórios para excluir linfoma subjacente; investigar síndrome hemofagocítica sistêmica (citopenias, função hepática) mesmo quando a biópsia não mostra atipia franca."],
      pearl: "citofagocitose (\"bean bag cells\") na paniculite deve sempre levantar a suspeita de linfoma subcutâneo (γ/δ T, NK/T ou SPTCL) — imunofenotipagem é obrigatória, e a síndrome hemofagocítica sistêmica pode ocorrer mesmo sem linfoma demonstrável.",
    },
  },
  {
    match: /histiocitose de depósito de cristais/i,
    exclusive: true,
    data: {
      concept: ["Acúmulo de cristais de imunoglobulina dentro de histiócitos, quase sempre associado a gamopatia monoclonal (discrasia plasmocitária)."],
      histology: ["Histiócitos com cristais intracitoplasmáticos (derivados de cadeias de imunoglobulina) nos lóbulos gordurosos."],
      evaluation: ["Rastrear gamopatia monoclonal com eletroforese de proteínas séricas/urinárias e imunofixação; considerar imuno-histoquímica para cadeias leves de imunoglobulina nos cristais."],
      pearl: "cristais intra-histiocitários na gordura subcutânea devem sempre motivar o rastreio de gamopatia monoclonal.",
    },
  },
  {
    match: /paniculite pós-irradiação/i,
    exclusive: true,
    data: {
      concept: ["Paniculite esclerosante tardia, decorrente de radioterapia prévia no campo acometido (incluindo reação de \"recall\" após quimioterapia em campo previamente irradiado)."],
      histology: ["Fibrose profunda dos septos com infiltrado inflamatório misto (linfócitos, plasmócitos, macrófagos, eosinófilos)."],
      evaluation: ["Correlacionar com campo de irradiação prévio e período de latência; diferenciar de morfea profunda e de recidiva tumoral no campo irradiado."],
      pearl: "esclerose septal profunda num campo de radioterapia prévia, mesmo anos depois, define a paniculite pós-irradiação.",
    },
  },
  {
    match: /alopécia androgenética/i,
    exclusive: true,
    data: {
      concept: ["Distúrbio andrógeno-dependente com conversão progressiva de fios terminais em fios miniaturizados (vellus), mediada pela di-hidrotestosterona (DHT) via 5α-redutase."],
      clinical: ["Afinamento não sincronizado dos fios; nos homens, recuo frontotemporal e rarefação do vértice; nas mulheres, poupança da linha de implantação frontal com alargamento da risca central (padrão em \"árvore de Natal\")."],
      histology: ["Número total de folículos normal na derme superficial, mas reduzido na junção derme-subcutâneo (\"miniaturização\"); ausência de inflamação significativa; \"streamers\" fibrosos aumentados abaixo dos folículos miniaturizados; discreto aumento da contagem de telógenos; couro cabeludo não envolvido (ex.: occipital) normal."],
      evaluation: ["Tricoscopia mostra heterogeneidade da espessura dos fios e predomínio de unidades foliculares com um único fio terminal; biópsia raramente necessária, mas útil em apresentações confusas — a razão terminal:vellus no nível do istmo ajuda a diferenciar de eflúvio telógeno."],
      pearl: "miniaturização folicular (redução de folículos na junção derme-subcutâneo) sem inflamação, com folículos normais na derme superficial, define a alopecia androgenética.",
    },
  },
  {
    match: /eflúvio telógeno/i,
    exclusive: true,
    data: {
      concept: ["Transição sincronizada de um grande número de folículos da fase anágena para a telógena, em resposta a um gatilho sistêmico (three months antes do achado clínico)."],
      clinical: ["Afinamento difuso de todo o couro cabeludo; gatilhos incluem febre alta, parto, doença sistêmica, deficiências nutricionais, estresse emocional intenso e diversos medicamentos; forma crônica sem gatilho identificável é comum em mulheres."],
      histology: ["Número total de fios normal, incluindo número normal de fios terminais; aumento da contagem de telógenos para >20% (raramente excede 50%; >80% é incompatível com eflúvio telógeno); ausência de inflamação e de fibrose."],
      evaluation: ["Tricograma com >20% de fios em telógeno é diagnóstico; investigar função tireoidiana, hemograma, ferritina sérica quando o gatilho não for evidente; a razão terminal:vellus no istmo diferencia de alopecia androgenética, com a qual frequentemente coexiste."],
      pearl: "contagem de telógenos aumentada (>20%) com número normal de fios terminais e ausência de inflamação define o eflúvio telógeno — miniaturização folicular aponta para androgenética associada.",
    },
  },
  {
    match: /tricotilomania/i,
    exclusive: true,
    data: {
      concept: ["Alopecia por arrancamento mecânico repetitivo dos fios, geralmente relacionada a transtorno do controle de impulsos."],
      clinical: ["Placa de alopecia de contorno bizarro/geométrico com fios de comprimentos variados; couro cabeludo sem eritema ou descamação significativos."],
      histology: ["Folículos de tamanho normal; número total de fios (terminais e vellus) normal; arquitetura folicular incompleta/rota; aumento de fios em catágeno/telógeno; tricomalácia (hastes pregueadas ou torcidas dentro do infundíbulo) e \"pigment casts\"; ausência de inflamação significativa."],
      evaluation: ["Tricomalácia sem inflamação é o achado histológico mais discriminativo; diferenciar de alopecia areata (que tem infiltrado peribulbar) e de tinea capitis (hifas, inflamação)."],
      pearl: "tricomalácia com arquitetura folicular rota e ausência de inflamação, em folículos de número e tamanho normais, define a tricotilomania.",
    },
  },
  {
    match: /alopécia areata/i,
    exclusive: true,
    data: {
      concept: ["Doença autoimune mediada por células T (padrão Th1/IFN-γ, linfócitos T CD8+NKG2D+) que provoca colapso do privilégio imune do folículo piloso."],
      clinical: ["Placas bem demarcadas de alopecia não cicatricial; \"cabelos em ponto de exclamação\", pontos pretos e pontos amarelos à tricoscopia; pode evoluir para perda total do couro cabeludo (alopecia total) ou de todo o corpo (universal)."],
      histology: ["Fase aguda/subaguda: infiltrado linfomononuclear peribulbar (por vezes com eosinófilos) afetando bulbos de fios terminais em anágeno/catágeno, com alterações degenerativas da matriz, aumento de fios em catágeno/telógeno e miniaturizados, tricomalácia e \"pigment casts\". Fase crônica/estável: predomínio de fios em catágeno/telógeno com miniaturização difusa (fios \"nanógenos\"), infiltrado peribulbar mais discreto."],
      evaluation: ["O infiltrado peribulbar (não perifolicular superior) é a chave para diferenciar de alopecias cicatriciais; correlacionar com tricoscopia e considerar rastreio de outras doenças autoimunes associadas (tireoidopatia)."],
      pearl: "infiltrado linfocitário peribulbar ao redor de fios terminais/catágenos, com miniaturização folicular difusa na fase crônica, define a alopecia areata.",
    },
  },
  {
    match: /peri-infundibular e perifolicular/i,
    exclusive: true,
    data: {
      concept: ["Grupo de alopecias cicatriciais e inflamatórias com padrão de acometimento predominantemente no infundíbulo/istmo (bulge), onde reside o nicho de células-tronco foliculares — por isso a destruição nessa região é irreversível."],
      clinical: [
        "LPP (líquen escleropilar/planopilar) e alopecia frontal fibrosante (AFF) compartilham o mesmo espectro histológico; a AFF acomete tipicamente a linha de implantação frontotemporal e sobrancelhas, enquanto a LPP clássica forma placas multifocais no vértice/occipital com eritema e descamação perifolicular na borda ativa.",
        "Lúpus discoide pode causar alopecia cicatricial com eritema, descamação, atrofia e discromia.",
        "Alopecia de tração relaciona-se a penteados tracionantes (tranças apertadas, extensões), favorecendo a região frontotemporal (\"fringe sign\").",
        "Esclerodermia/morfeia do couro cabeludo (incluindo a forma \"em golpe de sabre\") causa alopecia cicatricial com placa endurecida, por vezes deprimida.",
      ],
      histology: [
        "LPP: infiltrado linfocitário em faixa que obscurece a interface do epitélio folicular, poupando relativamente a epiderme interfolicular; alteração vacuolar e hipergranulose no infundíbulo; perda de glândulas sebáceas; fendas de Max-Joseph (artefato); tufting folicular tardio; IFD com corpos coloides (IgM) e faixa \"desgrenhada\" de fibrinogênio quando há epiderme envolvida.",
        "Lúpus discoide: alteração vacuolar de interface predominantemente vacuolar (não liquenoide) no epitélio folicular; perda de glândulas sebáceas; espessamento da membrana basal folicular em fases tardias; infiltrado linfoplasmocitário periecrino/perineural; mucina dérmica aumentada; IFD com depósitos granulares de IgG/C3 na junção dermoepidérmica e/ou perifolicular.",
        "Alopecia de tração: aumento de fios em catágeno/telógeno nas fases iniciais sem inflamação significativa; fase tardia com \"espaços em branco\" (cicatrizes foliculares colunares) e preservação de glândulas sebáceas e músculo eretor do pelo mesmo sem o folículo piloso.",
        "Esclerodermia/morfeia: fibrose septal/dérmica com aprisionamento de anexos, infiltrado linfoplasmocitário perivascular/perianexial nas fases iniciais.",
      ],
      evaluation: ["A biópsia deve ser feita na margem ativa (borda com cabelo), com pelo menos 4 mm e alcançando a gordura, idealmente com um espécime vertical e outro horizontal; IFD ajuda a diferenciar lúpus discoide (granular) de LPP (corpos coloides/fibrinogênio) de penfigoide de mucosas."],
      pearl: "a distinção entre essas alopecias cicatriciais depende de onde a inflamação se concentra (interface folicular na LPP/AFF, vacuolar com mucina no lúpus discoide, sem inflamação na tração) e da topografia clínica (frontotemporal na AFF/tração, multifocal na LPP, placa endurecida na esclerodermia).",
    },
  },
  {
    match: /foliculite decalvante/i,
    exclusive: true,
    data: {
      concept: ["Alopecia cicatricial neutrofílica primária, provavelmente relacionada a uma resposta imune exagerada ao Staphylococcus aureus."],
      clinical: ["Pústulas foliculares dolorosas com tufos de múltiplos fios por óstio (\"tufted hair folliculitis\" — mais de 5 fios por unidade folicular à tricoscopia), evoluindo para alopecia cicatricial."],
      histology: ["Foliculite pustulosa neutrofílica rica em linfócitos e plasmócitos; fases iniciais com infiltrado perifolicular misto de predomínio neutrofílico e abscessos foliculares; ruptura folicular com inflamação parcialmente granulomatosa; fragmentos de haste \"nua\" dentro de células gigantes; cocos Gram-positivos frequentemente presentes; fases tardias com cicatriz perifolicular e tufting, além de cicatriz dérmica interfolicular."],
      evaluation: ["Cultura bacteriana da pústula para confirmar S. aureus; diferenciar de tinea capitis (hifas/artroconídios na haste, sem os tufos característicos)."],
      pearl: "tufos de múltiplos fios por óstio folicular, com foliculite pustulosa neutrofílica e cocos Gram-positivos, definem a foliculite decalvante.",
    },
  },
  {
    match: /\btinea capitis\b/i,
    exclusive: true,
    data: {
      concept: ["Infecção dermatofítica do couro cabeludo, classificada pelo padrão de invasão da haste capilar: endotrix, ectotrix ou fávica."],
      clinical: ["Padrão endotrix (T. tonsurans, antropofílico) causa a clássica alopecia em \"pontos pretos\"; padrão ectotrix (ex.: M. canis, zoofílico) causa placas descamativas (\"gray patch\"), por vezes fluorescentes à lâmpada de Wood; querion é uma reação inflamatória exuberante com placa boggy, que pode cursar com alopecia permanente se não tratada prontamente; a fávus é a forma mais grave, com escútulas e alto risco de alopecia cicatricial permanente."],
      histology: ["Hifas e artroconídios dentro (endotrix) ou ao redor (ectotrix) da haste capilar, mais bem evidenciados por PAS ou prata; biópsia é reservada para quando KOH e cultura forem negativos apesar de suspeita clínica persistente — sempre enviar tecido também para cultura, pelo risco de falso-negativo na histologia."],
      evaluation: ["KOH e cultura fúngica (ou PCR) confirmam o diagnóstico; a linfadenopatia occipital/cervical ajuda a diferenciar de outras causas de alopecia inflamatória."],
      pearl: "artroconídios/hifas dentro ou ao redor da haste capilar (endotrix vs. ectotrix) definem a tinea capitis — reservar biópsia para quando KOH/cultura forem negativos com suspeita persistente.",
    },
  },
  {
    match: /sífilis secundária/i,
    data: {
      clinical: ["Na alopecia da sífilis secundária, o padrão mais típico é \"em traça\" (moth-eaten), com múltiplas placas pequenas e mal definidas, predominando na região parieto-occipital; perda de sobrancelhas/barba também pode ocorrer; alopecia difusa (símile eflúvio telógeno) é menos comum."],
      pearl: "alopecia em padrão \"traçado por traça\" (múltiplas placas pequenas mal definidas, parieto-occipital) num paciente com outros estigmas de sífilis secundária é altamente característica.",
    },
  },
  {
    match: /^candidíase$|pústula.*candidíase|candidíase.*pústula/i,
    exclusive: true,
    data: {
      concept: ["Infecção por Candida (mais comumente C. albicans) do compartimento córneo/intraepidérmico, favorecida por umidade, oclusão e imunossupressão."],
      clinical: ["Placas eritematosas, por vezes erosivas, com pústulas e pápulas satélites características na periferia; predileção por áreas intertriginosas (submamária, inguinal, interglútea) e região da fralda; pode se sobrepor a dermatite seborreica ou psoríase intertriginosa."],
      histology: ["Pseudo-hifas e leveduras em brotamento na camada córnea, mais bem evidenciadas por PAS; pústula neutrofílica subcórnea/intraespinhosa associada."],
      evaluation: ["KOH com pseudo-hifas e leveduras confirma o diagnóstico; a presença de pústulas satélites na periferia da placa é a pista clínica mais característica."],
      pearl: "pústulas satélites na periferia de uma placa eritematosa intertriginosa, com pseudo-hifas na camada córnea, define a candidíase cutânea.",
    },
  },
  {
    match: /\bpega\b/i,
    exclusive: true,
    data: {
      concept: ["Pustulose exantemática generalizada aguda (PEGA/AGEP): erupção febril aguda, predominantemente medicamentosa (>90% dos casos), com início rápido (por vezes <4 dias, sugerindo sensibilização prévia)."],
      clinical: ["Início súbito com febre alta; pústulas estéreis numerosas, pequenas (<5 mm), não foliculares, sobre grandes áreas de eritema edematoso, começando na face ou grandes dobras (axilas, virilha) e disseminando em horas; resolve com descamação superficial em 1-2 semanas. Neutrofilia sanguínea é típica."],
      histology: ["Pústulas espongiformes nas camadas superficiais da epiderme, menos exuberantes que na psoríase pustulosa; edema da derme papilar com infiltrado misto perivascular de neutrófilos e eosinófilos."],
      evaluation: ["Diferenciar de psoríase pustulosa generalizada (von Zumbusch) — ausência de história pessoal de psoríase, início mais rápido e exposição medicamentosa recente favorecem PEGA; a presença de eosinófilos no infiltrado também favorece PEGA. Diferenciar de DRESS (evolução mais prolongada, linfocitose atípica, hipereosinofilia marcante, acometimento visceral comum)."],
      pearl: "pústulas estéreis não foliculares numerosas sobre eritema edematoso, com início rápido após exposição a fármaco e neutrofilia, define a PEGA — eosinófilos no infiltrado ajudam a diferenciar da psoríase pustulosa.",
    },
  },
  {
    match: /psoríase pustulosa|pênfigo por iga/i,
    data: {
      concept: ["Padrão de pústula estéril subcórnea/intraespinhosa compartilhado por diversas entidades (ver Tabela 8.4 de Bolognia); a composição do infiltrado, a presença de acantólise e a imunofluorescência direta (IFD) discriminam entre elas."],
      clinical: ["Psoríase pustulosa: pode ser generalizada (von Zumbusch, com febre e toxicidade sistêmica) ou localizada (palmoplantar, acrodermatite contínua); pênfigo por IgA: vesicopústulas flácidas sobre pele eritematosa ou normal, frequentemente em padrão anular/circinado com crostas centrais, predileção por axilas e virilha."],
      histology: ["Psoríase pustulosa: acúmulo maciço de neutrófilos entre ceratinócitos eosinofílicos, formando pústulas espongiformes de Kogoj exageradas e microabscessos de Munro na camada córnea. Pênfigo por IgA: pústula intraepidérmica de conteúdo predominantemente neutrofílico, geralmente sem acantólise; tipo dermatose pustulosa subcórnea (IgA nas camadas superiores) vs. tipo neutrofílico intraepidérmico (IgA em toda a espessura da epiderme)."],
      evaluation: ["IFD é o principal discriminador: IgA intercelular na pênfigo por IgA (ausente na psoríase pustulosa e na dermatose pustulosa subcórnea de Sneddon-Wilkinson, que é clinicamente/histologicamente semelhante mas com IFD negativa)."],
      pearl: "pústula subcórnea estéril sem acantólise pode ser psoríase pustulosa, Sneddon-Wilkinson ou pênfigo por IgA — a IFD (IgA intercelular positiva apenas no pênfigo por IgA) é o critério decisivo.",
    },
  },
  {
    match: /dermatites eczematosas impetiginizadas/i,
    exclusive: true,
    data: {
      concept: ["Dermatite eczematosa (espongiótica) de base com infecção bacteriana secundária sobreposta, tipicamente por S. aureus ou Streptococcus do grupo A."],
      histology: ["Espongiose e vesiculação epidérmica de fundo eczematoso, com pústula/crosta superficial rica em neutrófilos e cocos Gram-positivos sobrepostos."],
      evaluation: ["Cultura da secreção/crosta para confirmar o agente e guiar antibioticoterapia; tratar tanto a dermatite de base quanto a infecção secundária."],
      pearl: "espongiose de fundo eczematoso com pústula neutrofílica superficial contendo cocos Gram-positivos define a dermatite eczematosa impetiginizada — trate a dermatite de base e a infecção.",
    },
  },
  {
    match: /linfedema crônico/i,
    exclusive: true,
    data: {
      concept: ["Fibrose dérmica progressiva secundária ao acúmulo crônico de linfa por drenagem linfática deficiente (primária ou secundária — malignidade, radioterapia, esvaziamento linfonodal, celulite de repetição, filariose)."],
      clinical: ["Edema depressível (cacifo) inicialmente, evoluindo com endurecimento progressivo por fibrose; pele com hiperceratose e papilomatose nos casos avançados (elefantíase nostra verrucosa); ciclo vicioso de infecções de repetição que agravam o linfedema."],
      histology: ["Fibrose dérmica e do subcutâneo com espessamento do colágeno; dilatação de vasos linfáticos e, por vezes, sanguíneos; nas formas avançadas, hiperceratose e papilomatose epidérmica (elefantíase nostra verrucosa)."],
      evaluation: ["Correlacionar com história de cirurgia/radioterapia oncológica, infecções de repetição ou causas primárias; linfedema crônico de longa data é fator de risco para angiossarcoma cutâneo (síndrome de Stewart-Treves), que deve ser considerado diante de lesão nodular ou equimótica de crescimento rápido na área."],
      pearl: "fibrose dérmica com vasos linfáticos dilatados, num contexto de edema crônico, define o linfedema — lembre-se do angiossarcoma (Stewart-Treves) como complicação tardia em casos de longa duração.",
    },
  },
  {
    match: /queloide/i,
    exclusive: true,
    data: {
      concept: ["Distúrbio de cicatrização com proliferação fibroblástica e produção excessiva de colágeno que se estende além das margens da lesão original — ao contrário da cicatriz hipertrófica, que fica confinada à ferida."],
      clinical: ["Nódulo/placa firme que ultrapassa as bordas da lesão/ferida original, com extensões em \"garra de caranguejo\"; início tardio (até 1 ano após o trauma, por vezes até décadas) e não regride espontaneamente; mais comum em peles mais pigmentadas."],
      histology: ["Feixes de colágeno espessos, vítreos, homogêneos, dispostos em turbilhões/nódulos com orientação aleatória (\"colágeno queloidiano\") — pode estar ausente em até 45% dos casos; fibroblastos não aumentados dentro do colágeno queloidiano; vasos dérmicos verticais não aumentados (ao contrário da cicatriz hipertrófica); mastócitos e mucina dérmica aumentados."],
      evaluation: ["Diferenciar da cicatriz hipertrófica: esta tem fibroblastos aumentados, colágeno fino e ondulado paralelo à epiderme, e vasos verticais aumentados — o queloide tem o oposto. Na ausência de colágeno queloidiano típico, achados que favorecem queloide incluem ausência de achatamento epidérmico, borda avançando em \"língua\" na derme reticular e bandas fibrosas fasciais profundas."],
      pearl: "colágeno espesso, vítreo e homogêneo em turbilhões desorganizados, sem aumento de fibroblastos ou de vasos verticais, e se estendendo além da ferida original, define o queloide — a cicatriz hipertrófica tem o padrão oposto (colágeno fino paralelo, fibroblastos e vasos aumentados) e fica confinada à ferida.",
    },
  },
  {
    match: /condrodermatite nodular da hélice/i,
    exclusive: true,
    data: {
      concept: ["Lesão reacional benigna da hélice/anti-hélice auricular, atribuída a isquemia focal do pericôndrio por pressão crônica (ex.: dormir do mesmo lado) somada a fotodano."],
      clinical: ["Pápula ou nódulo firme e muito doloroso à palpação na hélice (ou anti-hélice), por vezes com crosta ou ulceração central; mais comum em homens de meia-idade/idosos na hélice e em mulheres na anti-hélice."],
      histology: ["Ulceração ou acantose epidérmica central com crosta serosanguinolenta; colágeno dérmico degenerado/necrobiótico central circundado por tecido de granulação e fibrose; perda de anexos; alterações inflamatórias e fibrose do pericôndrio subjacente, com graus variáveis de degeneração da cartilagem."],
      evaluation: ["Diferenciar de carcinoma basocelular/espinocelular (a dor intensa à palpação favorece condrodermatite) e de outras lesões papulosas hiperqueratóticas auriculares; a biópsia deve incluir o pericôndrio para avaliar a cartilagem subjacente."],
      pearl: "dor desproporcional ao tamanho da lesão, numa pápula central na hélice com necrobiose de colágeno e alterações do pericôndrio subjacente, é a assinatura da condrodermatite nodular da hélice.",
    },
  },
  {
    match: /dermatopatia fibrosante nefrogênica/i,
    exclusive: true,
    data: {
      concept: ["Fibrose sistêmica nefrogênica (FSN): fibrose cutânea (e por vezes de outros órgãos) associada à exposição a contrastes à base de gadolínio em pacientes com doença renal crônica avançada ou lesão renal aguda."],
      clinical: ["Placas endurecidas simétricas no tronco e extremidades, eritematosas a hiperpigmentadas, com bordas irregulares de avanço (\"ameboides\"), frequentemente causando contraturas articulares; placas escleróticas amareladas na esclera podem ocorrer."],
      histology: ["O processo estende-se ao longo dos septos fibrosos até o subcutâneo — biópsia profunda é necessária; feixes de colágeno espessados dispostos de forma desordenada, com aumento de células fibroblasto-símiles CD34+ e procolágeno I positivas; deposição de mucina e metaplasia óssea podem ocorrer; partículas de gadolínio podem ser detectadas por espectroscopia."],
      evaluation: ["Correlacionar com exposição prévia a gadolínio e função renal; a biópsia deve ser profunda para avaliar a extensão septal; geralmente refratária a corticosteroides e imunossupressores."],
      pearl: "colágeno espessado desorganizado com células CD34+/procolágeno I+ estendendo-se pelos septos até o subcutâneo, em paciente com doença renal crônica exposto a gadolínio, define a dermatopatia fibrosante nefrogênica.",
    },
  },
  {
    match: /\bcicatriz atrófica\b/i,
    exclusive: true,
    data: {
      concept: ["Fase final e estável do processo cicatricial, com redução do número de fibroblastos e homogeneização do colágeno, sem sinais de inflamação ativa."],
      histology: ["Epiderme afinada com achatamento das cristas; derme com feixes colágenos finos dispostos paralelamente à superfície, poucos fibroblastos, redução ou ausência de anexos; ausência de infiltrado inflamatório significativo."],
      evaluation: ["Correlacionar com história de trauma, cirurgia, acne ou outra dermatose prévia no local; diferenciar de outras dermatoses fibrosantes com fibroblastos reduzidos (necrobiose lipoídica, acrodermatite crônica atrófica) pela ausência de achados sistêmicos ou infecciosos associados."],
      pearl: "colágeno fino paralelo à superfície com poucos fibroblastos, ausência de anexos e sem inflamação ativa define a cicatriz atrófica — um achado final e estável do processo de reparo.",
    },
  },
  {
    match: /acrodermatite crônica atrófica/i,
    exclusive: true,
    data: {
      concept: ["Manifestação tardia da borreliose de Lyme europeia (Borrelia afzelii, predominantemente), refletindo persistência do espiroqueta na pele; doença bifásica com fase inflamatória precoce e fase atrófica tardia."],
      clinical: ["Fase precoce: placas/nódulos eritemato-violáceos, pele empastada e edemaciada, em região acral dos membros. Fase tardia (anos depois): pele com aspecto brilhante em \"papel de cigarro\", vasos proeminentes, faixas fibrosas em superfícies extensoras (cotovelo/tíbia); resistente a tratamento."],
      histology: ["Fase precoce: infiltrado linfoplasmocitário perivascular dérmico, espaços vasculares telangiectásicos revestidos por endotélio, discreta atrofia epidérmica. Fase tardia: epiderme atrófica, infiltrado linfoplasmocitário intersticial com histiócitos e mastócitos ocasionais, derme atenuada com fibrose perianexial."],
      evaluation: ["PCR para Borrelia no tecido pode ser positiva; correlacionar com história epidemiológica europeia (B. afzelii não ocorre nas Américas); diferenciar de dermatite de estase, dano actínico crônico, atrofia por corticoide tópico potente e, nas formas fibróticas, de morfea/fibromatoses."],
      pearl: "infiltrado linfoplasmocitário intersticial numa derme atrófica com fibrose perianexial, em membro distal com pele em \"papel de cigarro\", sugere a fase tardia da acrodermatite crônica atrófica — pesquisar Borrelia por PCR e contexto epidemiológico europeu.",
    },
  },
  {
    match: /atrofodermia de pierini|líquen esclero-atrófico|gvhd esclerodermoide|radiodermite/i,
    exclusive: true,
    data: {
      concept: ["Grupo de dermatoses fibrosantes com redução de fibroblastos e esclerose estabelecida — o contexto clínico e a topografia diferenciam entre si, já que a esclerose dérmica tardia pode ser histologicamente semelhante entre elas."],
      clinical: [
        "Atrofodermia de Pasini-Pierini: placas acastanhadas deprimidas no tronco (dorso), com borda abrupta em \"corte de penhasco\", sem induração — considerada por muitos uma forma \"queimada\"/atrófica de morfeia.",
        "Líquen escleroso e atrófico (morfeia superficial): placas branco-nacaradas atróficas, mais comuns na região anogenital, com fragilidade e por vezes bolhas/púrpura.",
        "GVHD esclerodermoide (forma crônica): esclerose cutânea que mimetiza morfeia/esclerodermia sistêmica, podendo cursar com contraturas articulares em paciente com transplante de células hematopoiéticas prévio.",
        "Radiodermite crônica: atrofia, telangiectasias e esclerose num campo de radioterapia prévio, com perda de anexos.",
      ],
      histology: [
        "Atrofodermia de Pasini-Pierini: epiderme normal/discretamente atrófica, derme com espessura reduzida e homogeneização/agrupamento variável do colágeno reticular, infiltrado perivascular linfo-histiocitário discreto; achados pouco específicos — diagnóstico principalmente clínico.",
        "Líquen escleroso: hiperceratose com tampões foliculares, atrofia epidérmica, alteração vacuolar de interface, edema/homogeneização em faixa da derme papilar com infiltrado linfocitário em banda logo abaixo.",
        "GVHD esclerodermoide: esclerose dérmica com espessamento do colágeno indistinguível da morfeia/esclerodermia sistêmica, mas com incontinência pigmentar e melanófagos na derme papilar como pista adicional.",
        "Radiodermite crônica: epiderme atrófica, colágeno dérmico homogeneizado/hialinizado, fibroblastos \"actínicos\" bizarros com núcleos aumentados e hipercromáticos, vasos ectasiados, perda de anexos.",
      ],
      evaluation: ["A correlação clínica (topografia, história de radioterapia ou transplante, sorologia para Borrelia na atrofodermia) é decisiva, já que a esclerose dérmica tardia é um achado final compartilhado por várias dessas entidades."],
      pearl: "quando a histologia mostra apenas esclerose dérmica inespecífica com fibroblastos reduzidos, a história clínica (radioterapia prévia, transplante de medula, topografia anogenital, borda em corte de penhasco no tronco) é o que realmente diferencia essas dermatoses fibrosantes tardias entre si.",
    },
  },
];

type SurvivalGuideOverride = {
  match: RegExp;
  histology: ReactNode[];
  pearl: ReactNode;
};

const SURVIVAL_GUIDE_OVERRIDES: SurvivalGuideOverride[] = [
  {
    match: /^(dermatite atópica|dermatite de contato(?: irritativa| por irritante)?|dermatite numular|dermatite disidrótica|reação id|dermatite seborreica|pitiríase alba)(?:\s|\||$)/i,
    histology: [
      <><Highlight>Fase aguda:</Highlight> espongiose, por vezes com microvesículas, edema papilar e infiltrado perivascular superficial com linfócitos e eosinófilos.</>,
      <><Highlight>Fase subaguda:</Highlight> paraceratose, acantose e espongiose residual, com pouco edema dérmico.</>,
      <><Highlight>Fase crônica:</Highlight> hiperqueratose compacta, acantose, espongiose mínima e possível fibrose superficial.</>,
    ],
    pearl: <>As dermatites eczematosas compartilham o mesmo espectro microscópico. <Highlight>Microabscessos de Langerhans</Highlight> favorecem contato alérgico; neutrófilos na camada córnea exigem excluir <Highlight>fungos e psoríase</Highlight>.</>,
  },
  {
    match: /^dermatite de estase(?:\s|\||$)/i,
    histology: [
      <>Espongiose e acantose variáveis sobre <Highlight>proliferação lobular de vasos espessados</Highlight> na derme superficial.</>,
      <><Highlight>Hemácias extravasadas e siderófagos</Highlight> são frequentes; pode coexistir dermatite eczematosa.</>,
    ],
    pearl: <>Em biópsia da perna, a pista principal é <Highlight>vascular</Highlight>: vasos superficiais espessados em lóbulos, hemorragia e siderófagos. Se a lesão simular neoplasia, examine níveis mais profundos.</>,
  },
  {
    match: /^pitiríase rósea(?:\s|\||$)/i,
    histology: [
      <><Highlight>Montículos focais de paraceratose</Highlight> sobre epiderme espongiótica.</>,
      <>Hemorragia na derme papilar e infiltrado linfocitário perivascular discreto.</>,
    ],
    pearl: <>Os <Highlight>montículos discretos de paraceratose</Highlight> são a melhor pista. Neutrófilos sugerem psoríase gutata; eosinófilos conspícuos levantam erupção medicamentosa pitiríase-rósea-símile.</>,
  },
  {
    match: /^psoríase \|/i,
    histology: [
      <><Highlight>Paraceratose confluente e seca</Highlight>, hipogranulose e neutrófilos na camada córnea ou epiderme.</>,
      <>Hiperplasia psoriasiforme regular, adelgaçamento suprapapilar e capilares papilares dilatados e tortuosos.</>,
    ],
    pearl: <>Neutrófilos na camada córnea exigem pensar em <Highlight>psoríase ou dermatofitose</Highlight>. Eosinófilos dérmicos não são usuais e favorecem psoríase induzida por fármaco.</>,
  },
  {
    match: /^psoríase eruptiva\/gutata(?:\s|\||$)/i,
    histology: [
      <><Highlight>Montículos discretos de paraceratose com neutrófilos</Highlight>; as alterações epidérmicas são menos desenvolvidas que na psoríase vulgar.</>,
      <>Vasos papilares dilatados, geralmente sem eosinófilos.</>,
    ],
    pearl: <>Montículos de paraceratose com neutrófilos favorecem <Highlight>psoríase gutata</Highlight>. Sem neutrófilos, a distinção de pitiríase rósea pode depender inteiramente da clínica.</>,
  },
  {
    match: /^psoríase pustulosa(?:\s|\||$)/i,
    histology: [
      <><Highlight>Grandes coleções de neutrófilos</Highlight> subcórneas ou intraepidérmicas.</>,
      <>Pouca alteração epidérmica em lesões rápidas, com camada granulosa parcialmente preservada e <Highlight>ausência de eosinófilos</Highlight>.</>,
    ],
    pearl: <>Antes de concluir psoríase pustulosa, exclua fungos. <Highlight>Eosinófilos</Highlight> favorecem PEGA/erupção pustulosa por droga ou infecção fúngica.</>,
  },
  {
    match: /^pitiríase rubra pilar(?:\s|\||$)/i,
    histology: [
      <>Hiperplasia psoriasiforme com camada granulosa preservada ou espessada e <Highlight>tampões foliculares</Highlight>.</>,
      <><Highlight>Alternância vertical e horizontal</Highlight> de ortoqueratose e paraceratose, formando padrão em tabuleiro de xadrez.</>,
    ],
    pearl: <>O padrão em tabuleiro pode ser sutil. <Highlight>Tampão folicular com granulosa preservada</Highlight> favorece pitiríase rubra pilar; biópsias precoces ou de pápulas foliculares podem ser inespecíficas.</>,
  },
  {
    match: /^(líquen simples crônico|prurigo nodular)(?:\s|\||$)/i,
    histology: [
      <>Hiperqueratose compacta, hipergranulose e acantose, por vezes pseudoepiteliomatosa no prurigo nodular.</>,
      <><Highlight>Feixes colágenos espessados e verticais</Highlight> na derme papilar, com infiltrado geralmente escasso.</>,
    ],
    pearl: <>O <Highlight>“sinal da palma pilosa”</Highlight> - epiderme acralizada em pele com folículos - e o colágeno vertical favorecem líquen simples/prurigo. Inflamação intensa ou eosinófilos sugerem dermatite subjacente.</>,
  },
  {
    match: /^líquen plano \|/i,
    histology: [
      <>Hiperqueratose compacta <Highlight>sem paraceratose</Highlight>, hipergranulose e cristas em dentes de serra.</>,
      <>Infiltrado liquenoide com vacuolização basal e queratinócitos disceratóticos; <Highlight>eosinófilos não são esperados</Highlight>.</>,
    ],
    pearl: <>Paraceratose ou eosinófilos conspícuos afastam o líquen plano clássico e favorecem <Highlight>reação liquenoide medicamentosa</Highlight>.</>,
  },
  {
    match: /^(eritema pigmentar fixo|eritema pigmentar fixo,|erupção fixa por droga)(?:\s|\||$)/i,
    histology: [
      <>Estrato córneo em cesta ou com paraceratose focal, sem hipergranulose importante.</>,
      <><Highlight>Dermatite de interface intensa</Highlight> com queratinócitos necróticos, eosinófilos e melanófagos.</>,
    ],
    pearl: <>O diagnóstico exige história de recorrência no mesmo local. <Highlight>Melanófagos</Highlight> apoiam lesão em evolução ou recorrente, e o dano de interface costuma ser maior que na erupção morbiliforme.</>,
  },
  {
    match: /^erupção por droga(?:\s|\||$)/i,
    histology: [
      <>Epiderme normal ou com interface discreta e infiltrado perivascular superficial geralmente <Highlight>leve</Highlight>, por vezes profundo.</>,
      <>Linfócitos e eosinófilos compõem o infiltrado, mas os <Highlight>eosinófilos podem ser escassos</Highlight>.</>,
    ],
    pearl: <>Um infiltrado perivascular <Highlight>escasso</Highlight> em erupção disseminada é uma pista útil, mas a confirmação depende da cronologia medicamentosa.</>,
  },
  {
    match: /^eritema multiforme(?:, grave)?(?:\s|\||$)/i,
    histology: [
      <>Estrato córneo em cesta, infiltrado perivascular linfocitário discreto e vacuolização basal.</>,
      <><Highlight>Queratinócitos necróticos em todos os níveis</Highlight>; necrose epidérmica confluente ou total favorece SJS/NET.</>,
    ],
    pearl: <>No espectro EM/SJS/NET, o <Highlight>dano epidérmico é desproporcional ao infiltrado</Highlight>. Clivagem superficial sem disceratose sugere síndrome da pele escaldada estafilocócica.</>,
  },
  {
    match: /^doença enxerto versus hospedeiro/i,
    histology: [
      <>Vacuolização basal, queratinócitos disceratóticos variáveis e infiltrado perivascular linfocitário discreto.</>,
      <><Highlight>Satelitose linfocitária</Highlight> de queratinócitos necróticos é uma pista; formas crônicas podem ser liquenoides ou esclerodermoides.</>,
    ],
    pearl: <>A histologia pode atrasar em relação à clínica. Em biópsia muito precoce, níveis adicionais ou nova amostra podem revelar a doença; eosinófilos só favorecem fármaco quando <Highlight>numerosos</Highlight>.</>,
  },
  {
    match: /^(pitiríase liquenoide|PLEVA|pitiríase liquenoide e varioliforme aguda)/i,
    histology: [
      <><Highlight>PLEVA:</Highlight> paraceratose, espongiose, vacuolização basal, queratinócitos necróticos, infiltrado perivascular superficial e profundo e hemorragia papilar.</>,
      <><Highlight>PLC:</Highlight> paraceratose, acantose variável, necrose focal de queratinócitos e interface discreta com infiltrado superficial.</>,
    ],
    pearl: <>A combinação de <Highlight>interface e hemorragia</Highlight> é especialmente útil para PLEVA. Lesão ulcerada pode ser inespecífica; prefira rebiópsia de pápula recente.</>,
  },
  {
    match: /^(eritema anular centrífugo|eritema figurado)(?:\s|\||$)/i,
    histology: [
      <>Infiltrado linfocitário perivascular superficial ou superficial e profundo em padrão <Highlight>“manga de casaco”</Highlight>.</>,
      <>A variante superficial pode ter escama e espongiose discreta; a profunda geralmente poupa a epiderme.</>,
    ],
    pearl: <>O manguito linfocitário é característico, mas não específico. Em lesão anular descamativa, faça <Highlight>PAS</Highlight> e procure interface/mucina para excluir fungo e lúpus.</>,
  },
  {
    match: /^(dermatose púrprica pigmentada|doença de schamberg|púrpura liquenoide de gougerot)/i,
    histology: [
      <>Dermatite perivascular superficial com pouca alteração epidérmica e infiltrado linfocitário discreto.</>,
      <><Highlight>Hemácias extravasadas e siderófagos</Highlight>, ocasionalmente com padrão liquenoide, sem necrose fibrinoide.</>,
    ],
    pearl: <>Lesões iniciais podem ter hemácias sem siderófagos. A <Highlight>ausência de dano vascular</Highlight> separa a dermatose purpúrica de vasculite leucocitoclástica.</>,
  },
  {
    match: /^urticária pigmentosa(?:\s|\||$)/i,
    histology: [
      <>Infiltrado perivascular superficial moderado de <Highlight>mastócitos</Highlight>, por vezes acompanhado por eosinófilos.</>,
      <>TMEP tende a ser escassa; mastocitoma forma lençóis densos de mastócitos.</>,
    ],
    pearl: <>Mais de <Highlight>15 mastócitos por campo de grande aumento</Highlight> é uma regra prática útil. Em casos sutis, conte vários campos e compare com pele normal.</>,
  },
  {
    match: /^erupção polimorfa.*luz(?:\s|\||$)/i,
    histology: [
      <><Highlight>Edema subepidérmico proeminente</Highlight> e infiltrado linfocitário com redução gradual da densidade em profundidade.</>,
      <>Pode haver espongiose, queratinócitos necróticos focais e hemácias extravasadas.</>,
    ],
    pearl: <>Edema papilar acentuado em erupção pruriginosa fotoexposta favorece EPL. Mucina intensa, atrofia ou espessamento da membrana basal apontam para <Highlight>lúpus</Highlight>.</>,
  },
  {
    match: /^(insulto por artrópode|insulto por artrópodes|reação de hipersensibilidade|síndrome de wells)/i,
    histology: [
      <><Highlight>Infiltrado rico em eosinófilos</Highlight>, frequentemente em cunha e podendo alcançar a hipoderme.</>,
      <>Lesão precoce pode mostrar vesícula espongiótica no ponto de inoculação; lesões tardias têm epiderme pouco alterada e menos eosinófilos.</>,
      <>Figuras em chama podem ocorrer em qualquer dermatite eosinofílica e <Highlight>não são específicas de Wells</Highlight>.</>,
    ],
    pearl: <>Infiltrado moderado a denso com muitos eosinófilos favorece artrópode; células CD30+ podem aparecer e simular papulose linfomatoide. <Highlight>Figuras em chama isoladas não fecham Wells</Highlight>.</>,
  },
  {
    match: /^pseudolinfoma/i,
    histology: [
      <>Hiperplasia linfoide “top-heavy”, preservando anexos, com centros germinativos polarizados e <Highlight>macrófagos de corpos tingíveis</Highlight>.</>,
      <>Células B restritas aos centros, células T ao redor, população mista e ausência de restrição de cadeia leve.</>,
    ],
    pearl: <>A distinção de linfoma B indolente pode ser difícil: arquitetura reativa, polarização e ausência de restrição favorecem pseudolinfoma, mas <Highlight>imunofenotipagem e correlação clínica</Highlight> são quase sempre necessárias.</>,
  },
  {
    match: /síndrome de sweet/i,
    histology: [
      <><Highlight>Infiltrado dérmico difuso de neutrófilos</Highlight> com leucocitoclasia e edema papilar.</>,
      <>Pode haver tumefação endotelial e hemácias extravasadas, mas não vasculite primária.</>,
    ],
    pearl: <>Leucocitoclasia não basta para chamar vasculite: em Sweet, falta dano parietal primário. Exclua infecção e considere variante <Highlight>histiocitoide</Highlight> com MPO se o infiltrado parecer mononuclear.</>,
  },
  {
    match: /^sarcoidose(?: subcutânea)?(?:\s|\||$)/i,
    histology: [
      <><Highlight>Granulomas epitelioides “nus”</Highlight>, bem formados e com manguito linfocitário escasso.</>,
      <>Corpos asteroides ou de Schaumann podem ocorrer, mas não são específicos.</>,
    ],
    pearl: <>Sarcoidose é diagnóstico de exclusão: procure material polarizável e use <Highlight>Grocott e Fite</Highlight>, além de cultura quando não houver diagnóstico sistêmico estabelecido.</>,
  },
  {
    match: /^granuloma anular(?: subcutâneo)?(?:\s|\||$)/i,
    histology: [
      <>Padrão em paliçada ou intersticial com histiócitos envolvendo colágeno alterado e <Highlight>mucina dérmica</Highlight>.</>,
      <>O processo costuma ser regional, sem ocupar difusamente toda a derme; a paliçada pode ser incompleta.</>,
    ],
    pearl: <>Examine primeiro em pequeno aumento. <Highlight>Mucina</Highlight> favorece granuloma anular; plasmócitos e padrão estratificado favorecem necrobiose lipoídica, enquanto interface/eosinófilos sugerem fármaco.</>,
  },
  {
    match: /^necrobiose lipo[ií]dica(?:\s|\||$)/i,
    histology: [
      <>Comprometimento dérmico difuso com <Highlight>camadas horizontais</Highlight> de inflamação alternando com colágeno necrobiótico.</>,
      <>Agregados linfoides e plasmócitos são frequentes; o processo pode alcançar a hipoderme superficial.</>,
    ],
    pearl: <>O padrão estratificado em pequeno aumento e os <Highlight>plasmócitos</Highlight> favorecem necrobiose lipoídica sobre granuloma anular.</>,
  },
  {
    match: /^nódulo reumatoide(?:\s|\||$)/i,
    histology: [
      <>Granuloma em paliçada na derme profunda/hipoderme envolvendo centro de <Highlight>fibrina acelular intensamente eosinofílica</Highlight>.</>,
      <>Pouco manguito linfocitário e ausência de mucina abundante.</>,
    ],
    pearl: <>A localização profunda e a <Highlight>fibrina central</Highlight> favorecem nódulo reumatoide; mucina abundante aponta para granuloma anular profundo.</>,
  },
  {
    match: /^morf(eia|ea)(?: |\(|\||$)/i,
    histology: [
      <>Na fase inicial, infiltrado perivascular e perianexial <Highlight>linfoplasmocitário</Highlight> pode preceder a esclerose evidente.</>,
      <>Na fase estabelecida, feixes colágenos compactados, com redução dos espaços intersticiais e aprisionamento/perda de anexos.</>,
    ],
    pearl: <>O “bloco quadrado” em pequeno aumento não basta, pois o dorso normal pode parecer espesso. A pista é a <Highlight>redução dos espaços entre feixes colágenos</Highlight>; lesão precoce pode mostrar apenas plasmócitos.</>,
  },
  {
    match: /^líquen escleroso e atrófico(?:\s|\||$)/i,
    histology: [
      <><Highlight>Inicial:</Highlight> infiltrado liquenoide linfoplasmocitário, possível hiperplasia psoriasiforme e espessamento da membrana basal.</>,
      <><Highlight>Estabelecido:</Highlight> derme papilar homogeneizada/esclerótica, epiderme atrófica com hiperqueratose compacta e infiltrado abaixo do colágeno alterado.</>,
    ],
    pearl: <>Considere líquen escleroso em toda dermatite de interface genital. Quando houver sobreposição com líquen plano ou morfeia, um diagnóstico descritivo de <Highlight>dermatite liquenoide/esclerosante</Highlight> é apropriado.</>,
  },
  {
    match: /^dermatopatia fibrosante nefrogênica(?:\s|\||$)/i,
    histology: [
      <>Fibrose dérmica com proliferação de <Highlight>fibroblastos CD34+</Highlight> e mucina intersticial.</>,
      <>Corpos escleróticos, por vezes ossificados, podem estar presentes; fibroblastos diminuem em lesões tardias.</>,
    ],
    pearl: <>Fibrose celular com mucina e corpos escleróticos favorece dermatopatia fibrosante nefrogênica. O diagnóstico exige contexto de <Highlight>insuficiência renal/exposição a gadolínio</Highlight>.</>,
  },
  {
    match: /^doença de grover(?:\s|\||$)/i,
    histology: [
      <><Highlight>Focos pequenos de acantólise e disceratose</Highlight>, em padrões semelhantes a Darier, Hailey-Hailey, pênfigo vulgar ou dermatite espongiótica.</>,
      <>Infiltrado linfocitário perivascular superficial discreto; diferentes padrões podem coexistir na mesma amostra.</>,
    ],
    pearl: <>A <Highlight>focalidade</Highlight> e a multiplicidade de padrões são as melhores pistas. Como o achado pode ser muito pequeno, níveis adicionais frequentemente revelam a lesão.</>,
  },
  {
    match: /^pênfigo vulgar urticariforme(?:\s|\||$)/i,
    histology: [
      <><Highlight>Bolha suprabasal acantolítica</Highlight> com camada basal preservada em “fileira de lápides” e extensão ao epitélio folicular.</>,
      <>IFD perilesional com IgG, com ou sem C3, em padrão intercelular reticulado.</>,
    ],
    pearl: <>A extensão da acantólise aos anexos e por áreas amplas favorece pênfigo vulgar; Grover é focal e Darier acrescenta <Highlight>disceratose</Highlight>.</>,
  },
  {
    match: /^penfigoide bolhoso urticariforme(?:\s|\||$)/i,
    histology: [
      <>Na fase urticariforme pode haver apenas <Highlight>espongiose eosinofílica</Highlight> e eosinófilos alinhados na camada basal.</>,
      <>Na fase bolhosa, clivagem subepidérmica rica em eosinófilos; IFD perilesional linear para C3 e IgG.</>,
    ],
    pearl: <>Em idoso com prurido e espongiose eosinofílica, pense em <Highlight>penfigoide pré-bolhoso</Highlight>. A IFD deve ser perilesional; pele lesional ou da perna aumenta falsos negativos.</>,
  },
  {
    match: /^pênfigo cicatricial(?:\s|\||$)/i,
    histology: [
      <>Clivagem subepitelial semelhante ao penfigoide bolhoso, com infiltrado variável e <Highlight>fibrose/cicatrização</Highlight> nas lesões antigas.</>,
      <>IFD perilesional linear na junção dermoepidérmica.</>,
    ],
    pearl: <>Achados de penfigoide em <Highlight>mucosa de paciente idoso</Highlight>, sobretudo com cicatriz, devem levantar penfigoide de membranas mucosas.</>,
  },
  {
    match: /^dermatite herpetiforme(?:\s|\||$)/i,
    histology: [
      <><Highlight>Lesão inicial:</Highlight> microabscessos de neutrófilos nas pontas das papilas dérmicas.</>,
      <><Highlight>Lesão desenvolvida:</Highlight> vesícula subepidérmica com neutrófilos; IFD mostra IgA granular, acentuada nas papilas.</>,
    ],
    pearl: <>A histologia se sobrepõe a IgA linear, lúpus bolhoso e EBA inflamatória. Sem <Highlight>imunofluorescência direta</Highlight>, prefira diagnóstico descritivo.</>,
  },
  {
    match: /^iga linear(?:\s|\||$)/i,
    histology: [
      <>Vesícula subepidérmica com neutrófilos, geralmente mais <Highlight>dispersos</Highlight> que na dermatite herpetiforme.</>,
      <>IFD perilesional com <Highlight>depósito linear de IgA</Highlight> na membrana basal; casos por fármaco podem ser ricos em eosinófilos.</>,
    ],
    pearl: <>A separação de dermatite herpetiforme é impossível apenas no HE: <Highlight>IgA linear</Highlight> na IFD define a doença, enquanto IgA granular papilar favorece dermatite herpetiforme.</>,
  },
  {
    match: /epidermólise bolhosa/i,
    histology: [
      <>Padrão mais comum: bolha subepidérmica <Highlight>paucicelular</Highlight>, com fibrina e poucas células; formas inflamatórias podem ter neutrófilos e eosinófilos.</>,
      <>Lesões antigas podem cicatrizar com mílios; IFD linear para IgG/C3 e, na pele salino-clivada, depósito no <Highlight>assoalho</Highlight>.</>,
    ],
    pearl: <>Bolha subepidérmica pouco inflamatória em área de trauma favorece EBA. No salt-split, <Highlight>assoalho = EBA</Highlight> e teto = penfigoide bolhoso.</>,
  },
  {
    match: /porfiria cutânea tarda|porfiria variegata|porfiria eritropoiética/i,
    histology: [
      <>Bolha subepidérmica paucicelular com <Highlight>festonamento das papilas</Highlight> e vasos papilares espessados.</>,
      <>Corpos em lagarta podem ocorrer; IFD mostra depósitos na membrana basal e depósitos vasculares céreos.</>,
    ],
    pearl: <>Festonamento mais vasos espessados é a combinação prática. <Highlight>PAS</Highlight> destaca glicoproteína vascular; pseudoporfiria é histologicamente idêntica e exige correlação clínica.</>,
  },
  {
    match: /^calcifilaxia(?:\s|\||$)/i,
    histology: [
      <><Highlight>Calcificação de arteríolas e artérias pequenas/médias</Highlight> da hipoderme, com proliferação intimal, trombos de fibrina e necrose adiposa.</>,
      <>Pode haver cálcio em tecidos moles e ao redor de glândulas écrinas.</>,
    ],
    pearl: <>A lesão costuma estar na hipoderme: <Highlight>biópsia superficial pode ser não diagnóstica</Highlight>. Calcificação vascular associada a necrose em paciente com insuficiência renal é a pista central.</>,
  },
  {
    match: /^eritema nodoso(?:\s|\||$)/i,
    histology: [
      <>Paniculite predominantemente <Highlight>septal</Highlight>, com edema e neutrófilos nas fases iniciais e septos alargados por inflamação/fibrose posteriormente.</>,
      <>Granulomas radiais de Miescher podem ocorrer; <Highlight>vasculite verdadeira não é característica</Highlight>.</>,
    ],
    pearl: <>Classifique primeiro em pequeno aumento: eritema nodoso é o protótipo da <Highlight>paniculite septal sem vasculite</Highlight>. Uma biópsia profunda é indispensável.</>,
  },
  {
    match: /^(eritema indurado|vasculite nodular)(?:\s|\||$)/i,
    histology: [
      <><Highlight>Paniculite lobular</Highlight> com granulomas, necrose adiposa e vasculite de artérias ou veias nos septos.</>,
      <>Lesões iniciais podem ter necrose fibrinoide; nas tardias predominam tumefação endotelial e inflamação mural mista.</>,
    ],
    pearl: <>O comprometimento difuso do lóbulo com <Highlight>dano vascular</Highlight> separa vasculite nodular de PAN, cuja inflamação adiposa fica concentrada ao redor do vaso.</>,
  },
  {
    match: /^lipodermatoesclerose(?:\s|\||$)/i,
    histology: [
      <>Fibrose septal e lobular relativamente paucicelular, com <Highlight>microcistos adiposos</Highlight> e necrose lipomembranosa PAS-positiva.</>,
      <>A derme sobrejacente costuma apresentar alterações de estase.</>,
    ],
    pearl: <>Os <Highlight>microcistos e lipomembranas</Highlight> são a melhor pista em uma paniculite pouco inflamatória; a história de insuficiência venosa completa o diagnóstico.</>,
  },
  {
    match: /^(paniculite factícia|paniculite traumática|paniculite ao frio)(?:\s|\||$)/i,
    histology: [
      <>Achados variáveis: inflamação septal e lobular, necrose adiposa, hemorragia e, tardiamente, fibrose e lipomembranas.</>,
      <>Material injetado pode produzir supuração ou padrão em “queijo suíço” com pseudocistos e células gigantes.</>,
    ],
    pearl: <>Pense em causa factícia quando clínica e histologia não concordarem. <Highlight>Polarize a lâmina</Highlight> e, se houver supuração/necrose, exclua infecção com colorações e cultura.</>,
  },
  {
    match: /^paniculite pancreática(?:\s|\||$)/i,
    histology: [
      <>Paniculite lobular com <Highlight>necrose enzimática extensa</Highlight>, adipócitos-fantasma e calcificação fina por saponificação.</>,
      <>Neutrófilos e poeira nuclear concentram-se na periferia da gordura necrótica.</>,
    ],
    pearl: <>Calcificação dentro da gordura necrótica e adipócitos-fantasma favorecem <Highlight>paniculite pancreática</Highlight>; na calcifilaxia, o cálcio predomina na parede vascular.</>,
  },
  {
    match: /^necrose gordurosa subcutânea do recém-nascido(?:\s|\||$)/i,
    histology: [
      <>Necrose lobular extensa com <Highlight>cristais eosinofílicos radiais nos adipócitos</Highlight>.</>,
      <>Infiltrado misto exuberante com neutrófilos, linfócitos e histiócitos.</>,
    ],
    pearl: <>Cristais radiais em adipócitos e inflamação intensa favorecem necrose gordurosa do recém-nascido; no <Highlight>esclerema neonatal</Highlight>, cristais podem existir, mas faltam necrose e inflamação exuberantes.</>,
  },
  {
    match: /^alopécia androgenética(?:\s|\||$)/i,
    histology: [
      <>Número folicular normal ou quase normal, com redução de terminais e aumento de <Highlight>fios miniaturizados</Highlight>.</>,
      <>Tratos fibrosos abaixo dos folículos miniaturizados e infiltrado perifolicular discreto; glândulas sebáceas preservadas e proeminentes.</>,
    ],
    pearl: <>Miniaturização sem infiltrado peribulbar favorece alopecia androgenética. <Highlight>Enxame de abelhas e tratos pigmentados</Highlight> apontam para alopecia areata.</>,
  },
  {
    match: /^alopécia areata(?:\s|\||$)/i,
    histology: [
      <>Número de folículos preservado, com infiltrado linfocitário <Highlight>peribulbar em “enxame de abelhas”</Highlight> e aumento de catágenos.</>,
      <>Tratos foliculares pigmentados; fases tardias mostram miniaturização acentuada.</>,
    ],
    pearl: <>O infiltrado pode desaparecer em lesões antigas: procure <Highlight>catágenos aumentados, miniaturização e tratos pigmentados</Highlight>. Plasmócitos exigem excluir sífilis secundária.</>,
  },
  {
    match: /^tricotilomania(?:\s|\||$)/i,
    histology: [
      <>Número e calibre folicular globalmente preservados, com aumento de catágenos/telógenos.</>,
      <><Highlight>Moldes pigmentares, fios deformados</Highlight> e apoptose da bainha radicular externa, sem inflamação significativa.</>,
    ],
    pearl: <>Moldes pigmentares e fios traumatizados sem infiltrado são a combinação mais útil; miniaturização importante favorece alopecia androgenética ou areata.</>,
  },
  {
    match: /^eflúvio telógeno(?:\s|\||$)/i,
    histology: [
      <>Número e tamanho dos folículos preservados, com <Highlight>20–50% em telógeno</Highlight>.</>,
      <>Sem miniaturização significativa e sem infiltrado inflamatório relevante.</>,
    ],
    pearl: <>A lâmina pode parecer quase normal. O diagnóstico repousa no <Highlight>aumento proporcional dos telógenos</Highlight> e na história de evento desencadeante.</>,
  },
  {
    match: /^foliculite decalvante(?:\s|\||$)/i,
    histology: [
      <>Folículos dilatados e queratóticos com <Highlight>abscesso neutrofílico intrafolicular</Highlight>.</>,
      <>Ruptura seguida por infiltrado perifolicular linfoplasmocitário, destruição folicular e cicatriz.</>,
    ],
    pearl: <>Abscesso folicular e plasmócitos em alopecia cicatricial sugerem foliculite decalvante. Faça <Highlight>Gram e cultura</Highlight>; cocos Gram-positivos podem ser demonstrados.</>,
  },
  {
    match: /^(varicela|infecção por herpesvírus|infecções por herpesvírus)(?:\s|\||$)/i,
    histology: [
      <>Vesícula intraepidérmica com balonização, acantólise e <Highlight>queratinócitos multinucleados</Highlight>.</>,
      <>Inclusões intranucleares em vidro fosco com marginação da cromatina; folículos são frequentemente acometidos.</>,
    ],
    pearl: <>Se a epiderme estiver ulcerada, procure efeito viral em <Highlight>folículos e queratinócitos necróticos</Highlight>. Sem inclusões, considere herpes incognito e correlacione com PCR.</>,
  },
  {
    match: /^(dermatofitose|tinea capitis)(?:\s|\||$)/i,
    histology: [
      <><Highlight>Neutrófilos na camada córnea</Highlight>, acantose por vezes psoriasiforme e infiltrado perivascular com eosinófilos.</>,
      <>Hifas podem ser discretas no HE; PAS ou Grocott evidenciam organismos na camada córnea, folículo ou haste.</>,
    ],
    pearl: <>Neutrófilos na camada córnea, lesão anular ou falha a corticoide devem disparar <Highlight>PAS/Grocott</Highlight>, mesmo quando os fungos não são visíveis no HE.</>,
  },
  {
    match: /^candidíase(?:\s|\||$)/i,
    histology: [
      <>Pústulas neutrofílicas e espongiose com <Highlight>leveduras e pseudohifas</Highlight> na camada córnea/epiderme superficial.</>,
      <>Infiltrado dérmico misto, frequentemente com eosinófilos.</>,
    ],
    pearl: <>Pseudohifas podem superar muito as leveduras e tendem a ficar <Highlight>perpendiculares à superfície</Highlight>; a tonalidade lilás no HE é uma pista útil.</>,
  },
  {
    match: /^(eritrasma|ceratólise punctata)(?:\s|\||$)/i,
    histology: [
      <>Epiderme quase normal com <Highlight>bactérias filamentosas na camada córnea</Highlight>.</>,
      <>Gram ou PAS evidencia pequenos cocobacilos.</>,
    ],
    pearl: <>Em pele axilar ou plantar aparentemente normal, examine a camada córnea. <Highlight>Organismos pequenos e pouca inflamação</Highlight> favorecem infecção por Corynebacterium.</>,
  },
  {
    match: /^(vitiligo|alteração pigmentar pós-inflamatória)(?:\s|\||$)/i,
    histology: [
      <><Highlight>Vitiligo:</Highlight> redução acentuada ou ausência de melanócitos e melanina; confirme com SOX10 ou Melan-A comparando pele normal.</>,
      <><Highlight>Alteração pós-inflamatória:</Highlight> epiderme pouco alterada, infiltrado perivascular discreto e melanófagos, com melanócitos preservados.</>,
    ],
    pearl: <>A pergunta decisiva é se os melanócitos foram perdidos. <Highlight>Melanófagos favorecem alteração pós-inflamatória</Highlight>; exclua pitiríase versicolor com PAS/Grocott.</>,
  },
  {
    match: /^(amiloidose macular|amiloidose maculosa|amiloidose papulosa|amiloidose macular)/i,
    histology: [
      <><Highlight>Depósitos homogêneos róseo-opacos</Highlight> nas papilas dérmicas, que ficam alargadas.</>,
      <>Melanófagos acompanham os depósitos; hiperqueratose e hipergranulose podem refletir escoriação.</>,
    ],
    pearl: <>Na amiloidose macular/liquenoide, o HE costuma ser mais sensível que o Congo vermelho. A restrição do material à <Highlight>derme papilar</Highlight> favorece forma cutânea localizada.</>,
  },
  {
    match: /^condrodermatite nodular da hélice(?:\s|\||$)/i,
    histology: [
      <>Ulceração com hiperplasia epidérmica reativa adjacente e <Highlight>degeneração fibrinoide do colágeno</Highlight> logo abaixo.</>,
      <>Proliferação vascular reativa sob o colágeno alterado, com pouca inflamação.</>,
    ],
    pearl: <>Em biópsia da hélice/anti-hélice, a degeneração fibrinoide central é a pista. Não confunda a <Highlight>hiperplasia pseudoepiteliomatosa reativa</Highlight> com carcinoma espinocelular.</>,
  },
];

function getEnrichment(matchText: string): Enrichment {
  const matches = ENRICHMENT_RULES.filter((rule) => rule.match.test(matchText));
  const exclusiveMatches = matches.filter((rule) => rule.exclusive);
  // A single exclusive match wins outright. If two or more exclusive rules match at once
  // (e.g. a diagnosisGroup node whose title/possibilities span several distinct diagnoses),
  // picking one arbitrarily would silently discard the others, so fall back to merging everything.
  const selectedRules = exclusiveMatches.length === 1 ? exclusiveMatches : matches;
  const initialEnrichment = selectedRules.some((rule) => rule.replaceDefaults)
    ? { ...DEFAULT_ENRICHMENT, clinical: [], histology: [], evaluation: [] }
    : DEFAULT_ENRICHMENT;
  const baseEnrichment = selectedRules.reduce<Enrichment>(
    (result, rule) => ({
      concept: [...result.concept, ...(rule.data.concept ?? [])],
      clinical: [...result.clinical, ...(rule.data.clinical ?? [])],
      histology: [...result.histology, ...(rule.data.histology ?? [])],
      evaluation: [...result.evaluation, ...(rule.data.evaluation ?? [])],
      pearl: rule.data.pearl ?? result.pearl,
    }),
    initialEnrichment,
  );
  const survivalGuideOverride = SURVIVAL_GUIDE_OVERRIDES.find((rule) => rule.match.test(matchText));
  return survivalGuideOverride
    ? { ...baseEnrichment, histology: survivalGuideOverride.histology, pearl: survivalGuideOverride.pearl }
    : baseEnrichment;
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
  const enrichmentMatchText = [node.title, ...(node.result?.possibilities ?? [])].join(" | ");
  const enrichment = getEnrichment(enrichmentMatchText);
  const pathIds = path.map((item) => item.id);
  const sectionsLeft: StudyNoteSectionData[] = [
    {
      id: "conceito",
      number: "1",
      color: "green",
      title: "Conceito",
      icon: <BookIcon />,
      bullets: enrichment.concept.length ? enrichment.concept : getPatternConcept(pathIds),
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
        pearl={enrichment.pearl}
      />
    </Layout>
  );
}
