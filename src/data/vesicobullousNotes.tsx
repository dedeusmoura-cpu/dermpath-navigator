import type { ReactNode } from "react";
import { Highlight } from "../components/StudyNoteCard";

/**
 * Notas de estudo do ramo das dermatites vésico-bolhosas.
 *
 * Ao contrário das ENRICHMENT_RULES (que casam por expressão regular no nome do diagnóstico e
 * mesclam fragmentos), cada nó deste ramo tem uma nota fechada e enxuta: quatro seções curtas,
 * um painel de destaque com o exame ou o achado que decide o caso, e uma pérola.
 */
export type FocusedNote = {
  title: string;
  concept: ReactNode[];
  clinical: ReactNode[];
  histology: ReactNode[];
  evaluation: ReactNode[];
  highlight?: { title: string; bullets: ReactNode[]; footer?: ReactNode };
  pearl: ReactNode;
};

// ---------------------------------------------------------------------------
// Vesículas intraepidérmicas — infecções
// ---------------------------------------------------------------------------

const herpesvirus: FocusedNote = {
  title: "Infecções por herpesvírus",
  concept: [
    <>Infecção citopática por <Highlight>HSV-1, HSV-2 ou VZV</Highlight>, que replica no queratinócito e o destrói.</>,
    "A vesícula nasce da degeneração balonizante e reticular, com acantólise secundária — não autoimune.",
  ],
  clinical: [
    "Vesículas agrupadas sobre base eritematosa, precedidas por ardor ou dor local.",
    <>HSV recidiva <Highlight>no mesmo sítio</Highlight>; o zóster é unilateral e <Highlight>dermatomérico</Highlight>.</>,
    "No imunossuprimido as lesões podem ser crônicas, verrucosas ou ulceradas.",
  ],
  histology: [
    <>Vesícula intraepidérmica por <Highlight>balonização e degeneração reticular</Highlight>, com queratinócitos acantolíticos no interior.</>,
    <>Queratinócitos <Highlight>multinucleados</Highlight>, com cromatina marginada (“vidro fosco”) e moldagem nuclear; inclusões de Cowdry A.</>,
    <>O <Highlight>epitélio folicular costuma estar acometido</Highlight> — pista contra outras vesículas acantolíticas.</>,
    "Infiltrado linfocitário denso, por vezes com vasculite linfocitária e necrose dérmica.",
  ],
  evaluation: [
    "HSV e VZV são histologicamente indistinguíveis; a separação é por imuno-histoquímica ou PCR.",
    "Pênfigo vulgar e Hailey-Hailey têm acantólise primária, sem efeito citopático.",
    "Mão-pé-boca e outras viroses enterovirais balonizam sem multinucleação.",
  ],
  highlight: {
    title: "Efeito citopático",
    bullets: [
      <>Os <Highlight>três “M”</Highlight>: multinucleação, marginação da cromatina e moldagem nuclear.</>,
      "O Tzanck mostra as células multinucleadas à beira do leito, mas não separa HSV de VZV.",
      <>A confirmação e a tipagem são por <Highlight>imuno-histoquímica ou PCR</Highlight> do raspado ou do bloco.</>,
    ],
    footer: "Sem os três “M”, questione o diagnóstico de herpes.",
  },
  pearl: <>vesícula acantolítica que <Highlight>desce pelo folículo</Highlight> e mostra os três “M” é herpética até prova em contrário; a tipagem, porém, exige imuno-histoquímica ou PCR.</>,
};

const varicela: FocusedNote = {
  title: "Varicela",
  concept: [
    <>Primoinfecção pelo <Highlight>vírus varicela-zóster</Highlight>, com disseminação hematogênica para a pele.</>,
    "Mesmo mecanismo citopático do herpes simples, porém em distribuição generalizada.",
  ],
  clinical: [
    <>Lesões em <Highlight>vários estágios ao mesmo tempo</Highlight> — mácula, pápula, vesícula e crosta (“céu estrelado”).</>,
    "Distribuição centrípeta, com acometimento do couro cabeludo e da mucosa oral; febre e prurido.",
    "No adulto e no imunossuprimido o quadro é mais grave, com risco de pneumonite.",
  ],
  histology: [
    "Vesícula intraepidérmica com balonização, degeneração reticular e necrose de queratinócitos.",
    <>Multinucleação, cromatina marginada e moldagem nuclear, idênticas às do <Highlight>herpes simples</Highlight>.</>,
    "Vasculite linfocitária dérmica e infiltrado misto acompanham as lesões mais desenvolvidas.",
  ],
  evaluation: [
    "A distinção com HSV é clínica ou por imuno-histoquímica/PCR — a histologia não resolve.",
    "Mão-pé-boca e riquetsioses vesiculares entram no diferencial das erupções vesiculares agudas.",
    "Lesão hemorrágica ou necrótica extensa sugere imunossupressão.",
  ],
  highlight: {
    title: "Efeito citopático",
    bullets: [
      "Multinucleação, marginação da cromatina e moldagem nuclear em queratinócitos.",
      <>Imuno-histoquímica anti-VZV (ou PCR) separa de <Highlight>HSV</Highlight>.</>,
    ],
    footer: "Lesões em estágios variados favorecem varicela sobre zóster disseminado.",
  },
  pearl: <>a varicela é <Highlight>polimorfa no tempo</Highlight> — lesões em todos os estágios simultaneamente — enquanto o zóster é monomorfo e dermatomérico; a histologia é a mesma.</>,
};

const maoPeBoca: FocusedNote = {
  title: "Doença mão-pé-boca",
  concept: [
    <>Exantema viral por <Highlight>enterovírus</Highlight> (coxsackie A16 e A6, enterovírus 71).</>,
    "A vesícula resulta de degeneração reticular e balonizante maciça, sem efeito citopático herpético.",
  ],
  clinical: [
    "Crianças pequenas, com febre baixa e enantema oral doloroso.",
    <>Vesículas <Highlight>ovaladas</Highlight> em mãos, pés e nádegas, orientadas pelas linhas cutâneas.</>,
    <>A cepa A6 causa doença extensa, <Highlight>“eczema coxsackium”</Highlight>, descamação e onicomadese tardias.</>,
  ],
  histology: [
    <>Vesícula intraepidérmica por <Highlight>degeneração reticular e balonização</Highlight>, com necrose de queratinócitos.</>,
    "Necrose epidérmica pode ser confluente nas formas graves, com crosta neutrofílica.",
    <>Infiltrado perivascular misto com neutrófilos; <Highlight>sem multinucleação nem inclusões</Highlight>.</>,
  ],
  evaluation: [
    "A ausência dos três “M” afasta herpes — a pista mais útil na prática.",
    "Eritema multiforme mostra interface e necrose basal; aqui a lesão é do meio da epiderme para cima.",
    "PCR de swab de lesão ou orofaringe confirma quando o quadro é atípico.",
  ],
  highlight: {
    title: "Diferencial crítico",
    bullets: [
      <>Balonização intensa <Highlight>sem multinucleação</Highlight> = enterovírus, não herpes.</>,
      "Necrose alta na epiderme, com pouca alteração de interface.",
    ],
    footer: "Onicomadese semanas depois confirma retrospectivamente a cepa A6.",
  },
  pearl: <>vesícula muito balonizada e necrótica, em criança, <Highlight>sem os três “M”</Highlight>, com lesões ovaladas acrais — pense em enterovírus.</>,
};

const impetigoBolhoso: FocusedNote = {
  title: "Impetigo bolhoso",
  concept: [
    <>Infecção superficial por <Highlight>S. aureus</Highlight> produtor das toxinas esfoliativas ETA/ETB, que clivam a <Highlight>desmogleína 1</Highlight>.</>,
    "É a expressão localizada do mesmo mecanismo que, quando disseminado pela circulação, causa a síndrome da pele escaldada estafilocócica.",
  ],
  clinical: [
    <>Vesículas evoluem para <Highlight>bolhas flácidas e transparentes</Highlight>; a ruptura deixa erosão rasa com colarete de escamas e pouca inflamação ao redor.</>,
    "Predomina em crianças e pode acometer face, tronco, nádegas, períneo, axilas e extremidades; sintomas sistêmicos costumam faltar.",
  ],
  histology: [
    <>Clivagem acantolítica <Highlight>na camada granulosa</Highlight>, morfologicamente semelhante ao pênfigo foliáceo.</>,
    <>Há pouca inflamação na cavidade; neutrófilos superficiais e <Highlight>cocos gram-positivos</Highlight> podem ser vistos.</>,
  ],
  evaluation: [
    <>Colher cultura do exsudato sob a crosta ou de <Highlight>bolha íntegra</Highlight>; a IFD é negativa.</>,
    "Cocos favorecem impetigo no contexto agudo e localizado, mas não são absolutos: uma lesão de pênfigo pode sofrer infecção secundária.",
    "Na SSSS, a bolha é estéril e a bactéria deve ser procurada no foco primário à distância.",
  ],
  highlight: {
    title: "Cocos na bolha",
    bullets: [
      <>Favorecem <Highlight>impetigo bolhoso</Highlight> quando a lesão é aguda e localizada.</>,
      <>Não dispensam correlação com a clínica e a <Highlight>IFD</Highlight> se houver suspeita de pênfigo.</>,
    ],
    footer: "Gram e cultura documentam o agente e orientam a suscetibilidade.",
  },
  pearl: <>clivagem granulosa com <Highlight>cocos na bolha</Highlight> favorece impetigo; se a clínica não for típica, exclua pênfigo foliáceo com IFD.</>,
};

const orfOrdenhadores: FocusedNote = {
  title: "Orf e nódulo dos ordenhadores",
  concept: [
    <>Infecção zoonótica por <Highlight>parapoxvírus</Highlight> — orf (ovinos e caprinos) e nódulo dos ordenhadores (bovinos).</>,
    "Doença autolimitada, adquirida por contato direto com o animal ou fômites.",
  ],
  clinical: [
    "Nódulo único em dedo ou mão, que evolui em estágios ao longo de 4 a 6 semanas.",
    "Fase-alvo: centro necrótico com halo branco e anel eritematoso; cura sem cicatriz.",
    "Ocupação (pecuária, veterinária, abate) é a chave anamnéstica.",
  ],
  histology: [
    <>Balonização e degeneração reticular da epiderme superior com <Highlight>vesiculação multiloculada</Highlight>.</>,
    <><Highlight>Inclusões eosinofílicas citoplasmáticas</Highlight> nos queratinócitos — não há inclusão nuclear.</>,
    "Hiperplasia epidérmica com fenda vertical, edema papilar intenso e vasos dilatados; infiltrado denso misto.",
  ],
  evaluation: [
    "As inclusões são citoplasmáticas, ao contrário das nucleares do grupo herpes.",
    "Diferenciar de granuloma piogênico, antraz cutâneo, micobacteriose atípica e carcinoma espinocelular.",
    "Orf e nódulo dos ordenhadores são histologicamente idênticos — separam-se pela exposição.",
  ],
  highlight: {
    title: "Inclusão citoplasmática",
    bullets: [
      <>Corpúsculos eosinofílicos <Highlight>no citoplasma</Highlight>, com núcleo preservado.</>,
      "Fenda vertical na epiderme hiperplásica e edema papilar exuberante completam o quadro.",
    ],
    footer: "A história de contato com ovinos ou bovinos define qual dos dois é.",
  },
  pearl: <>nódulo digital em quem lida com rebanho, com <Highlight>inclusões citoplasmáticas</Highlight> e edema papilar maciço, é parapoxvírus; a inclusão nuclear pertence ao herpes.</>,
};

const dermatofitoseVesicular: FocusedNote = {
  title: "Dermatofitose",
  concept: [
    <>Infecção da camada córnea por dermatófitos, que pode assumir apresentação <Highlight>vesicobolhosa</Highlight>, sobretudo nos pés.</>,
    "A vesícula reflete espongiose intensa da resposta do hospedeiro, não invasão profunda.",
  ],
  clinical: [
    "Vesículas e bolhas na planta e no arco plantar, com descamação e prurido.",
    "Borda ativa descamativa e assimetria são as pistas clínicas clássicas.",
    "Uso prévio de corticoide tópico mascara o quadro (tinea incognita).",
  ],
  histology: [
    <>Espongiose com vesiculação e <Highlight>neutrófilos na camada córnea</Highlight> — o “sinal do sanduíche”.</>,
    "Paraceratose compacta alternada com ortoceratose; infiltrado perivascular superficial misto.",
    <>As hifas ficam na córnea, muitas vezes <Highlight>invisíveis no HE</Highlight>.</>,
  ],
  evaluation: [
    "Sempre pedir PAS ou prata em vesícula plantar antes de assumir eczema disidrótico.",
    "Psoríase pustulosa e dermatite de contato entram no diferencial morfológico.",
    "Reação Id à distância pode coexistir e é fúngica-negativa.",
  ],
  highlight: {
    title: "PAS",
    bullets: [
      <>Neutrófilo na córnea de uma dermatite espongiótica <Highlight>obriga a pesquisa de fungo</Highlight>.</>,
      "PAS ou Grocott na córnea; micológico direto e cultura confirmam.",
    ],
    footer: "Vesícula plantar sem PAS é diagnóstico incompleto.",
  },
  pearl: <>neutrófilos ou hifas na camada córnea — o “sinal do sanduíche” — transformam uma dermatite espongiótica inespecífica em <Highlight>dermatofitose</Highlight>.</>,
};

// ---------------------------------------------------------------------------
// Vesículas intraepidérmicas — dermatites de contato, fotodermatoses e interface
// ---------------------------------------------------------------------------

const contatoIrritativa: FocusedNote = {
  title: "Dermatite de contato irritativa",
  concept: [
    <>Dano <Highlight>tóxico direto</Highlight> ao queratinócito, sem sensibilização prévia nem memória imunológica.</>,
    "A intensidade depende da concentração, do tempo de contato e da barreira cutânea.",
  ],
  clinical: [
    <>Lesão <Highlight>restrita ao local do contato</Highlight>, com limites nítidos e configuração artificial.</>,
    "Ardor e queimação predominam sobre o prurido; surge em horas.",
    "Agentes fortes (ácidos, álcalis, solventes) produzem bolha e necrose francas.",
  ],
  histology: [
    <>Necrose e balonização dos <Highlight>queratinócitos superiores</Highlight>, com vesiculação e crosta neutrofílica.</>,
    "Espongiose presente, porém menos proeminente que na forma alérgica.",
    "Infiltrado dérmico esparso, com poucos eosinófilos.",
  ],
  evaluation: [
    <>A forma <Highlight>alérgica</Highlight> tem espongiose dominante, eosinófilos e ultrapassa a área de contato.</>,
    "Queimadura química e fototoxicidade compartilham a necrose alta da epiderme.",
    "Teste de contato é negativo na irritativa — a separação final é clínica.",
  ],
  highlight: {
    title: "Irritativa × alérgica",
    bullets: [
      <><Highlight>Irritativa:</Highlight> necrose alta, neutrófilos, limites nítidos, ardor.</>,
      <><Highlight>Alérgica:</Highlight> espongiose, eosinófilos, prurido e extensão além do contato.</>,
    ],
    footer: "A histologia sugere; o teste de contato decide.",
  },
  pearl: <>necrose da epiderme superior com neutrófilos e limites geométricos aponta <Highlight>irritante</Highlight>; espongiose com eosinófilos e bordas que extravasam apontam alérgeno.</>,
};

const fototoxica: FocusedNote = {
  title: "Dermatite fototóxica",
  concept: [
    <>Reação <Highlight>não imunológica</Highlight> e dose-dependente entre um cromóforo e a radiação UVA.</>,
    "Comporta-se como uma queimadura solar exagerada — ocorre já na primeira exposição.",
  ],
  clinical: [
    <>Eritema, edema e bolhas <Highlight>estritamente na área fotoexposta</Highlight>, com limite pelo vestuário.</>,
    "Ardor mais que prurido; hiperpigmentação residual é a regra.",
    "Fitofotodermatose desenha estrias e impressões digitais bizarras.",
  ],
  histology: [
    <>Queratinócitos necróticos (<Highlight>“sunburn cells”</Highlight>) dispersos ou confluentes na epiderme.</>,
    "Edema dérmico e vesiculação intraepidérmica; bolha subepidérmica quando a necrose for extensa.",
    "Infiltrado perivascular esparso, com poucos eosinófilos.",
  ],
  evaluation: [
    <>A <Highlight>fotoalérgica</Highlight> é espongiótica e eczematosa, com eosinófilos, e ultrapassa a área exposta.</>,
    "Lúpus e erupção polimorfa à luz mostram interface e infiltrado mais denso e profundo.",
    "Rever fármacos fotossensibilizantes e contatos vegetais.",
  ],
  highlight: {
    title: "Topografia",
    bullets: [
      <>Limite <Highlight>exato pela roupa</Highlight> e poupança de áreas de sombra confirmam a fotodistribuição.</>,
      "Necrose de queratinócitos com pouco infiltrado favorece fototoxicidade.",
    ],
    footer: "Extensão para áreas cobertas sugere mecanismo fotoalérgico.",
  },
  pearl: <>fototóxica é <Highlight>queimadura</Highlight> — necrose com pouca inflamação, restrita ao sol; fotoalérgica é <Highlight>eczema</Highlight> — espongiose com eosinófilos que extravasa.</>,
};

const fotoalergicaPrecoce: FocusedNote = {
  title: "Dermatite fotoalérgica, precoce",
  concept: [
    <>Hipersensibilidade <Highlight>tardia tipo IV</Highlight> a um fotoalérgeno modificado pela UVA, com sensibilização prévia.</>,
    "Independe da dose — pequenas exposições reativam o quadro.",
  ],
  clinical: [
    "Eczema pruriginoso, que começa na área fotoexposta mas se estende para áreas cobertas.",
    "Aparece 24–72 h após a exposição, ao contrário da fototoxicidade imediata.",
    "Filtros solares, AINEs tópicos e fragrâncias são os agentes clássicos.",
  ],
  histology: [
    <><Highlight>Espongiose</Highlight> com vesiculação intraepidérmica, idêntica à do eczema de contato.</>,
    "Infiltrado perivascular superficial linfocitário com eosinófilos.",
    "Necrose de queratinócitos é escassa ou ausente — ao contrário da fototóxica.",
  ],
  evaluation: [
    "Não é possível separar de outros eczemas apenas pela histologia; a topografia é decisiva.",
    "Fototeste de contato (photopatch) confirma o agente.",
    "Erupção polimorfa à luz tem edema papilar e infiltrado perivascular denso, sem espongiose marcante.",
  ],
  highlight: {
    title: "Photopatch",
    bullets: [
      <>Padrão espongiótico + <Highlight>fotodistribuição que extravasa</Highlight> = suspeita fotoalérgica.</>,
      "A confirmação do agente é pelo fototeste de contato, não pela biópsia.",
    ],
    footer: "Reveja filtros solares, AINEs tópicos e fragrâncias.",
  },
  pearl: <>eczema espongiótico com <Highlight>fotodistribuição imperfeita</Highlight> — começa no sol e escapa para a sombra — é a assinatura da dermatite fotoalérgica.</>,
};

const eritemaMultiforme: FocusedNote = {
  title: "Eritema multiforme",
  concept: [
    <>Reação de <Highlight>interface citotóxica</Highlight> autolimitada, desencadeada na maioria das vezes por <Highlight>herpes simples</Highlight>.</>,
    "Em crianças e adolescentes, Mycoplasma pneumoniae é causa relevante.",
  ],
  clinical: [
    <>Lesões em <Highlight>alvo típico</Highlight>, com três zonas, de distribuição acral e simétrica.</>,
    "Surtos recorrentes que resolvem em 2 a 4 semanas; mucosa acometida na forma major.",
    "Prurido e ardor discretos; estado geral preservado.",
  ],
  histology: [
    <>Dermatite de interface <Highlight>vacuolar</Highlight> com queratinócitos necróticos em todos os níveis da epiderme.</>,
    "Exocitose linfocitária, edema da derme papilar e infiltrado perivascular superficial.",
    <>Quando a necrose confluir, forma-se <Highlight>bolha subepidérmica</Highlight> com teto necrótico.</>,
  ],
  evaluation: [
    <><Highlight>SJS/NET:</Highlight> necrose de espessura total com infiltrado escasso e destacamento extenso.</>,
    "Erupção fixa por droga tem melanófagos e mais eosinófilos, e recidiva no mesmo local.",
    "GVHD aguda mostra interface com satelitose e contexto de transplante.",
  ],
  highlight: {
    title: "Gatilho",
    bullets: [
      <>Interface citotóxica acral e recorrente = procurar <Highlight>herpes simples</Highlight> prévio.</>,
      "Comprometimento mucoso extenso e febre deslocam a hipótese para SJS/NET por fármaco.",
    ],
    footer: "Recorrência é a favor de EM; episódio único e grave, de fármaco.",
  },
  pearl: <>o eritema multiforme é <Highlight>pós-infeccioso e recorrente</Highlight>; extensão da necrose e envolvimento mucoso definem a passagem para o espectro SJS/NET.</>,
};

const eritemaMultiformeGrave: FocusedNote = {
  title: "Eritema multiforme, grave",
  concept: [
    <>Extremo do espectro de interface citotóxica, com <Highlight>necrose confluente</Highlight> e destacamento epidérmico.</>,
    "Na prática se sobrepõe ao espectro SJS/NET, quase sempre por fármaco.",
  ],
  clinical: [
    <>Lesões atípicas planas, dor cutânea intensa e <Highlight>Nikolsky positivo</Highlight>.</>,
    "Erosões em duas ou mais mucosas; febre e comprometimento sistêmico.",
    "Fármaco introduzido 1 a 3 semanas antes é o dado mais importante.",
  ],
  histology: [
    <><Highlight>Necrose epidérmica de espessura total</Highlight> com clivagem subepidérmica e teto necrótico.</>,
    "Infiltrado dérmico esparso, desproporcionalmente pobre para a extensão do dano.",
    "Nas fases iniciais ainda se veem queratinócitos necróticos isolados e interface vacuolar.",
  ],
  evaluation: [
    <><Highlight>SSSS:</Highlight> clivagem alta, subcórnea, sem necrose de queratinócitos — o corte por congelação separa em minutos.</>,
    "Pênfigo paraneoplásico combina interface com acantólise e tem IFD positiva.",
    "Dermatose por IgA linear induzida por vancomicina pode simular NET — IFD resolve.",
  ],
  highlight: {
    title: "Emergência",
    bullets: [
      <>Necrose de espessura total com <Highlight>inflamação escassa</Highlight> = urgência clínica.</>,
      <>Congelação do teto da bolha separa <Highlight>NET</Highlight> (epiderme toda) de <Highlight>SSSS</Highlight> (só córnea).</>,
      "IFD afasta pênfigo paraneoplásico e IgA linear.",
    ],
    footer: "Suspender o fármaco suspeito é a medida que muda o desfecho.",
  },
  pearl: <>epiderme necrótica de ponta a ponta com derme quase silenciosa é <Highlight>NET</Highlight> até prova em contrário; a congelação do teto da bolha é o exame mais rápido para excluir SSSS.</>,
};

const pleva: FocusedNote = {
  title: "PLEVA / Doença de Mucha-Habermann",
  concept: [
    <>Dermatose linfocitária de interface, hoje entendida como proliferação <Highlight>T clonal reativa</Highlight>.</>,
    "PLEVA e pitiríase liquenoide crônica formam um espectro contínuo.",
  ],
  clinical: [
    "Pápulas eritematosas que necrosam e ulceram, em surtos, no tronco e nas raízes dos membros.",
    <>Lesões em <Highlight>estágios diferentes</Highlight> convivendo; curam com cicatriz varioliforme.</>,
    "A forma ulceronecrótica febril é rara e grave.",
  ],
  histology: [
    <>Interface <Highlight>em cunha</Highlight>, “top-heavy”, com paraceratose e crosta neutrofílica.</>,
    <>Necrose de queratinócitos, exocitose linfocitária marcada e <Highlight>hemácias extravasadas</Highlight> na papila.</>,
    "Vesiculação e destacamento quando a necrose é intensa; vasculite linfocitária pode estar presente.",
  ],
  evaluation: [
    "Papulose linfomatoide tem células grandes CD30+ atípicas.",
    "Vasculite leucocitoclástica mostra fibrina na parede vascular e leucocitoclasia.",
    "Micose fungoide tem epidermotropismo com linfócitos atípicos e ausência de necrose aguda.",
  ],
  highlight: {
    title: "Tríade morfológica",
    bullets: [
      <>Interface + <Highlight>necrose de queratinócitos</Highlight> + hemácias extravasadas.</>,
      "Escamocrosta com neutrófilos sobre epiderme paraceratótica completa o quadro.",
    ],
    footer: "Prefira biopsiar pápula recente — a lesão ulcerada é inespecífica.",
  },
  pearl: <>a combinação de <Highlight>interface e hemorragia papilar</Highlight> sob uma crosta neutrofílica é o retrato da PLEVA; lesões em estágios distintos confirmam clinicamente.</>,
};

const eritemaPigmentarFixo: FocusedNote = {
  title: "Eritema pigmentar fixo",
  concept: [
    <>Reação a fármaco mediada por linfócitos T de memória <Highlight>residentes na pele</Highlight>, que recidiva sempre no mesmo local.</>,
    "AINEs, sulfas, tetraciclinas e antifúngicos são os gatilhos usuais.",
  ],
  clinical: [
    <>Placa arredondada única ou em pequeno número, que <Highlight>reaparece no mesmo sítio</Highlight> a cada exposição.</>,
    "Lábios, genitais e mãos são os locais preferenciais; deixa hiperpigmentação residual.",
    "Formas bolhosas e, raramente, generalizadas ocorrem.",
  ],
  histology: [
    <>Dermatite de interface <Highlight>intensa</Highlight>, com queratinócitos necróticos em todos os níveis e clivagem quando grave.</>,
    <>Infiltrado misto com <Highlight>eosinófilos e neutrófilos</Highlight>, superficial e profundo.</>,
    <><Highlight>Melanófagos abundantes</Highlight> na derme papilar — marca da recorrência.</>,
  ],
  evaluation: [
    "O dano de interface costuma ser maior do que na erupção morbiliforme por droga.",
    "Eritema multiforme não tem melanófagos proeminentes nem infiltrado profundo.",
    "A história de recorrência no mesmo local é o dado que fecha o diagnóstico.",
  ],
  highlight: {
    title: "Melanófagos",
    bullets: [
      <>Interface agressiva + <Highlight>melanófagos densos</Highlight> = lesão recorrente, não primeira.</>,
      "Eosinófilos e infiltrado profundo reforçam a etiologia medicamentosa.",
    ],
    footer: "Pergunte sempre: já apareceu antes, no mesmo lugar?",
  },
  pearl: <>interface exuberante com <Highlight>melanófagos</Highlight> e eosinófilos, em placa que recidiva no mesmo sítio, é erupção fixa por droga.</>,
};

const insultoArtropode: FocusedNote = {
  title: "Insulto por artrópode e simuladores",
  concept: [
    <>Reação de <Highlight>hipersensibilidade</Highlight> à saliva ou às partes bucais do artrópode, e não dano direto.</>,
    "Escabiose, pediculose e picadas diversas produzem o mesmo padrão histológico.",
  ],
  clinical: [
    "Pápulas e vesículas muito pruriginosas, agrupadas ou lineares, em áreas expostas.",
    "Bolha tensa pode dominar o quadro, sobretudo em crianças e nas pernas.",
    <>Lesões <Highlight>escoriadas</Highlight> e de idades diferentes são comuns.</>,
  ],
  histology: [
    <>Espongiose e balonização com vesiculação, sobre infiltrado dérmico <Highlight>em cunha</Highlight>, superficial e profundo.</>,
    <><Highlight>Eosinófilos abundantes</Highlight>, muitas vezes intersticiais e perianexiais.</>,
    "Edema papilar acentuado pode gerar bolha subepidérmica; às vezes se vê a peça bucal do artrópode.",
  ],
  evaluation: [
    "Penfigoide bolhoso pode ser idêntico — a IFD é o que separa em bolha tensa do idoso.",
    "Síndrome de Wells mostra figuras em chama; escabiose exige procurar o ácaro na córnea.",
    "Pense em leucemia/linfoma quando a reação for exagerada e persistente.",
  ],
  highlight: {
    title: "Infiltrado em cunha",
    bullets: [
      <>Cunha de eosinófilos, superficial <Highlight>e profunda</Highlight>, é a assinatura da picada.</>,
      <>Em bolha tensa de idoso, peça <Highlight>IFD</Highlight> antes de assumir artrópode.</>,
    ],
    footer: "Procure o ácaro na córnea sempre que houver prurido noturno e túneis.",
  },
  pearl: <>eosinófilos em cunha até a derme profunda sugerem artrópode, mas <Highlight>a IFD é obrigatória</Highlight> antes de descartar penfigoide em bolha tensa do idoso.</>,
};

const cantharidina: FocusedNote = {
  title: "Dermatite por cantharidina",
  concept: [
    <>Vesicante liberado por besouros (<Highlight>blister beetle</Highlight>) ou aplicado terapeuticamente, que rompe as ligações intercelulares.</>,
    "É agressão química direta, sem componente imunológico.",
  ],
  clinical: [
    "Bolha tensa e monomorfa que surge horas após o contato, com ardor e pouco prurido.",
    "Configuração linear ou geográfica, reproduzindo o esmagamento do inseto na pele.",
    "Cura sem cicatriz, com hiperpigmentação transitória.",
  ],
  histology: [
    <>Acantólise <Highlight>intraepidérmica</Highlight>, com clivagem em nível variável e pouca necrose.</>,
    "Inflamação dérmica escassa, desproporcional ao tamanho da bolha.",
    "Ausência de efeito citopático e de dermatite de interface.",
  ],
  evaluation: [
    <>Acantólise <Highlight>sem inflamação e com IFD negativa</Highlight> afasta os pênfigos.</>,
    "Herpes tem efeito citopático; dermatite irritativa tem necrose alta com neutrófilos.",
    "O contexto — bolha súbita, linear, após contato com inseto — é decisivo.",
  ],
  highlight: {
    title: "Acantólise “muda”",
    bullets: [
      <>Acantólise franca com derme <Highlight>quase silenciosa</Highlight> aponta agente vesicante.</>,
      "IFD negativa é necessária para excluir pênfigo.",
    ],
    footer: "Padrão linear e início em horas fecham o quadro.",
  },
  pearl: <>bolha acantolítica sem inflamação, de aparecimento súbito e configuração linear, é <Highlight>vesicante externo</Highlight> — não pênfigo.</>,
};

// ---------------------------------------------------------------------------
// Vesículas intraepidérmicas — dermatoses acantolíticas
// ---------------------------------------------------------------------------

const darier: FocusedNote = {
  title: "Doença de Darier",
  concept: [
    <>Genodermatose autossômica dominante por mutação em <Highlight>ATP2A2</Highlight> (bomba de cálcio SERCA2), com desmossomos instáveis.</>,
    "A acantólise é consequência de um distúrbio de queratinização, não de autoanticorpos.",
  ],
  clinical: [
    <>Pápulas ceratósicas e crostosas em <Highlight>áreas seborreicas</Highlight>, com odor característico.</>,
    <>Início típico na <Highlight>2ª década</Highlight>; piora com calor, suor, luz UV e lítio; curso crônico e familiar.</>,
    "Pápulas palmares puntiformes, sulcos e faixas alternadas nas unhas (“V” distal).",
  ],
  histology: [
    <><Highlight>Acantólise suprabasal focal</Highlight> formando lacunas, com papilas revestidas por células basais (“vilosidades”).</>,
    <>Disqueratose típica: <Highlight>corps ronds</Highlight> na camada espinhosa e <Highlight>grains</Highlight> na granulosa.</>,
    "Hiperceratose e paraceratose sobrejacentes, com tamponamento folicular.",
  ],
  evaluation: [
    <><Highlight>Grover:</Highlight> mesma morfologia, porém focal, transitória e sem história familiar.</>,
    "Hailey-Hailey tem acantólise de toda a espessura e disqueratose escassa.",
    <>Pênfigo vulgar <Highlight>não tem disqueratose</Highlight> e tem IFD positiva.</>,
  ],
  highlight: {
    title: "Disqueratose",
    bullets: [
      <><Highlight>Corps ronds</Highlight> (halo claro, núcleo picnótico) na espinhosa e <Highlight>grains</Highlight> na granulosa.</>,
      "Acantólise + disqueratose = grupo Darier/Grover; acantólise pura = pênfigo.",
      "IFD negativa.",
    ],
    footer: "História familiar e cronicidade separam Darier de Grover.",
  },
  pearl: <>acantólise suprabasal <Highlight>com disqueratose</Highlight> é a assinatura do grupo Darier–Grover; a IFD negativa e a ausência de acometimento mucoso afastam o pênfigo.</>,
};

const grover: FocusedNote = {
  title: "Doença de Grover",
  concept: [
    <>Dermatose <Highlight>acantolítica transitória</Highlight> do adulto, relacionada a calor, sudorese, repouso prolongado e fotodano.</>,
    "Não é hereditária nem autoimune; costuma resolver em semanas a meses.",
  ],
  clinical: [
    <>Seropápulas <Highlight>muito pruriginosas</Highlight> no <Highlight>V do tronco</Highlight> de homens idosos.</>,
    "Surtos após febre, internação, exposição solar ou calor intenso.",
    "Lesões escoriadas e crostosas dominam o exame.",
  ],
  histology: [
    <>Focos <Highlight>pequenos e circunscritos</Highlight> de acantólise, alternando com epiderme normal — a chave é o tamanho do foco.</>,
    "Quatro padrões: tipo Darier, tipo Hailey-Hailey, tipo pênfigo e espongiótico.",
    <>Disqueratose costuma estar presente; há <Highlight>espongiose e crostas</Highlight>, com eosinófilos frequentes.</>,
  ],
  evaluation: [
    "Darier é difuso, crônico e familiar; Grover é focal e transitório.",
    "Pênfigo vulgar acomete mucosa, é difuso e tem IFD positiva.",
    "Dermatose papular acantolítica genitocrural é focal, mas restrita à região genitocrural e sem disqueratose.",
  ],
  highlight: {
    title: "Foco pequeno",
    bullets: [
      <>Acantólise <Highlight>em ilhas</Highlight>, com epiderme normal ao lado, é o critério mais útil.</>,
      "Espongiose, crostas e eosinófilos acompanham — ausentes no Darier clássico.",
      "IFD negativa.",
    ],
    footer: "Corte seriado ajuda: o foco pode ser único em toda a lâmina.",
  },
  pearl: <>vários focos <Highlight>minúsculos</Highlight> de acantólise e disqueratose, com espongiose e crostas, em seropápulas pruriginosas no V do tronco de homem idoso — Grover.</>,
};

const haileyHailey: FocusedNote = {
  title: "Doença de Hailey-Hailey",
  concept: [
    <>Genodermatose autossômica dominante por mutação em <Highlight>ATP2C1</Highlight>, com falha na montagem dos desmossomos.</>,
    "Pênfigo familiar benigno: acantólise ampla, mas sem autoanticorpos.",
  ],
  clinical: [
    <>Placas maceradas, fissuradas e malcheirosas em <Highlight>grandes dobras</Highlight> — axilas, virilhas e região inframamária.</>,
    "Piora com atrito, calor, sudorese e infecção secundária.",
    "Curso crônico com surtos; faixas brancas longitudinais nas unhas.",
  ],
  histology: [
    <>Acantólise de <Highlight>toda a espessura</Highlight> da epiderme — aspecto de “parede de tijolos desmoronada”.</>,
    <>Hiperplasia epidérmica com <Highlight>projeções papilares</Highlight> revestidas por células acantolíticas.</>,
    <>Disqueratose escassa; <Highlight>a acantólise não desce pelos folículos</Highlight>, ao contrário do pênfigo.</>,
    "Escamocrosta impetiginizada é achado frequente.",
  ],
  evaluation: [
    "Pênfigo vulgar: acantólise suprabasal em fileira de lápides, com envolvimento folicular e IFD positiva.",
    "Darier e Grover têm disqueratose proeminente e focos menores.",
    "Considerar sobreinfecção bacteriana, por cândida ou herpética nos surtos abruptos.",
  ],
  highlight: {
    title: "IFD negativa",
    bullets: [
      <>Acantólise extensa com <Highlight>IFD negativa</Highlight> exclui o pênfigo — é o exame que fecha o caso.</>,
      "Toda a espessura acometida, sem descer pelo folículo.",
    ],
    footer: "Piora súbita: pesquise herpes sobreposto (eczema herpético).",
  },
  pearl: <>“parede de tijolos desmoronada” em dobra, com <Highlight>IFD negativa</Highlight> e sem acometimento folicular, é Hailey-Hailey e não pênfigo.</>,
};

const penfigoVulgar: FocusedNote = {
  title: "Pênfigo vulgar",
  concept: [
    <>Dermatose bolhosa autoimune causada por <Highlight>IgG anti-desmogleína 3</Highlight> (± Dsg1), que inibe a adesão desmossômica dos queratinócitos e produz acantólise.</>,
    <>Dois subtipos: <Highlight>mucoso-dominante</Highlight> (anti-Dsg3) e <Highlight>mucocutâneo</Highlight> (anti-Dsg3 + anti-Dsg1).</>,
  ],
  clinical: [
    <>Erosões orais dolorosas em <Highlight>praticamente todos</Highlight> os pacientes, frequentemente isoladas por meses; mucosa jugal e palatina são os sítios preferenciais.</>,
    <>Na pele, bolhas <Highlight>flácidas</Highlight> que rompem em erosões que não cicatrizam, com <Highlight>Nikolsky positivo</Highlight>; prurido é incomum.</>,
    "Pico entre 50 e 60 anos; mais da metade dos pacientes desenvolve lesões cutâneas após o quadro mucoso.",
  ],
  histology: [
    <><Highlight>Acantólise suprabasal sem necrose de queratinócitos</Highlight>: as células basais mantêm-se aderidas à membrana basal em <Highlight>“fileira de lápides”</Highlight>.</>,
    "Papilas dérmicas preservadas protruem para a cavidade da bolha, que contém poucas células acantolíticas soltas e, por vezes, eosinófilos.",
    <>A acantólise <Highlight>desce pelo epitélio folicular</Highlight>; a lesão muito precoce pode mostrar apenas <Highlight>espongiose eosinofílica</Highlight>.</>,
    "Biopsie a borda de uma vesícula ou bolha recente com o halo inflamatório — ou a lesão inteira, se pequena.",
  ],
  evaluation: [
    <><Highlight>Hailey-Hailey:</Highlight> acantólise de toda a espessura (“parede de tijolos desmoronada”), com hiperplasia epidérmica e sem acompanhar os folículos.</>,
    <><Highlight>Grover e Darier:</Highlight> focos pequenos de acantólise <Highlight>com disqueratose</Highlight> — ausente no pênfigo vulgar.</>,
    <><Highlight>Pênfigo foliáceo:</Highlight> clivagem alta, na granulosa. <Highlight>Pênfigo paraneoplásico:</Highlight> acantólise somada a necrose de queratinócitos e interface, com IgG/C3 também na membrana basal.</>,
    "Penfigoide bolhoso: bolha tensa, subepidérmica e rica em eosinófilos.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Biopsiar <Highlight>pele ou mucosa perilesional</Highlight>, nunca a bolha: a degeneração dos antígenos gera falso-negativo.</>,
      <><Highlight>IgG na superfície dos queratinócitos</Highlight>, em “rede de pesca”, por toda a espessura da epiderme; o C3 pode faltar, porque predomina IgG4.</>,
      <>Positiva em praticamente 100% dos casos ativos — <Highlight>IFD negativa põe o diagnóstico em dúvida</Highlight>.</>,
    ],
    footer: "IFI e ELISA anti-Dsg3 (± Dsg1) confirmam e acompanham a atividade.",
  },
  pearl: <>acantólise suprabasal em <Highlight>“fileira de lápides”</Highlight>, sem disqueratose e estendendo-se ao epitélio folicular, com <Highlight>IFD intercelular positiva</Highlight>, define o pênfigo vulgar.</>,
};

const penfigoFoliaceo: FocusedNote = {
  title: "Pênfigo foliáceo",
  concept: [
    <>Doença bolhosa autoimune superficial causada por autoanticorpos <Highlight>IgG contra a desmogleína 1</Highlight>.</>,
    <>A perda de adesão produz <Highlight>acantólise na epiderme superior</Highlight>, dentro ou junto à camada granulosa.</>,
  ],
  clinical: [
    <>Erosões escamocrostosas bem delimitadas em <Highlight>face, couro cabeludo e tronco superior</Highlight>; a bolha é tão frágil que raramente permanece íntegra.</>,
    <><Highlight>Não há acometimento mucoso clínico</Highlight>; Nikolsky pode ser positivo, e casos extensos podem evoluir para eritrodermia esfoliativa.</>,
    "O início pode simular impetigo ou dermatite seborreica; revisar medicamentos, especialmente penicilamina e captopril.",
  ],
  histology: [
    <>Acantólise <Highlight>dentro ou junto à granulosa</Highlight>; o teto pode se perder, deixando apenas a camada córnea “ausente”.</>,
    "Poucos queratinócitos acantolíticos, fusiformes ou em amêndoa, podem aderir ao teto ou ao assoalho.",
    "Neutrófilos na bolha e eosinófilos dérmicos são variáveis; espongiose eosinofílica pode preceder a clivagem.",
  ],
  evaluation: [
    <>A IFD de pele perilesional mostra <Highlight>IgG intercelular</Highlight>; o C3 pode faltar, e a intensidade não precisa se restringir à epiderme superior.</>,
    <>ELISA com <Highlight>anti-Dsg1 positivo</Highlight> e anti-Dsg3 negativo sustenta o fenótipo foliáceo.</>,
    "IFD negativa põe o diagnóstico em séria dúvida. Cocos podem representar infecção secundária e, isoladamente, não confirmam impetigo.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <><Highlight>IgG intercelular</Highlight> em rede de pesca é o achado principal.</>,
      <>O <Highlight>C3 pode estar presente ou ausente</Highlight>.</>,
      "Amostra perilesional reduz o risco de falso-negativo.",
    ],
    footer: "Amostra perilesional evita falso-negativo por degeneração antigênica na erosão.",
  },
  pearl: <>erosão escamocrostosa seborreica, sem mucosite, com acantólise granulosa e <Highlight>IgG intercelular</Highlight> define o eixo do pênfigo foliáceo.</>,
};

const penfigoIga: FocusedNote = {
  title: "Pênfigo por IgA",
  concept: [
    <>Grupo raro de dermatoses vesicopustulosas definido por <Highlight>IgA1 intercelular</Highlight> contra a superfície dos queratinócitos, sem autoanticorpos IgG.</>,
    "Tem dois subtipos: dermatose pustular subcórnea (SPD) e dermatose neutrofílica intraepidérmica (IEN).",
  ],
  clinical: [
    <>Vesículas e pústulas flácidas, muito pruriginosas, que formam desenhos <Highlight>anulares ou circinados</Highlight>; o padrão em “girassol” favorece o subtipo IEN.</>,
    "Axilas e virilhas são os locais mais comuns, seguidos de tronco e extremidades proximais; mucosa raramente é acometida.",
    "Pode coexistir com mieloma por IgA ou retocolite ulcerativa.",
  ],
  histology: [
    <>Pústulas <Highlight>subcórneas ou intraepidérmicas</Highlight> ricas em neutrófilos.</>,
    <><Highlight>Acantólise geralmente não é vista</Highlight>.</>,
    "No subtipo SPD, a pústula é alta; no IEN, pode ser suprabasal, baixa ou ocupar toda a espessura epidérmica.",
  ],
  evaluation: [
    <>IFD com <Highlight>IgA intercelular</Highlight> confirma o diagnóstico: predomina no alto da epiderme no SPD e pode ocupar toda a espessura no IEN.</>,
    "A desmocolina 1 é o principal alvo do subtipo SPD; o alvo do IEN permanece menos definido.",
    "IgA linear na zona da membrana basal indica outro diagnóstico: dermatose bolhosa por IgA linear.",
  ],
  highlight: {
    title: "IFD intercelular",
    bullets: [
      <><Highlight>IgA entre os queratinócitos</Highlight>, e não na membrana basal.</>,
      "A distribuição pode ser superficial ou envolver maior espessura da epiderme.",
    ],
    footer: "A demonstração da IgA intercelular é essencial para separar os mimetizadores pustulosos.",
  },
  pearl: <>pústula intraepidérmica neutrofílica, geralmente sem acantólise, com <Highlight>IgA intercelular</Highlight> aponta para pênfigo por IgA.</>,
};

const sindromePeleEscaldada: FocusedNote = {
  title: "Síndrome da pele escaldada estafilocócica",
  concept: [
    <>Doença sistêmica mediada pelas toxinas esfoliativas ETA/ETB de <Highlight>S. aureus</Highlight>, proteases que clivam a desmogleína 1.</>,
    <>A toxina circulante produz <Highlight>clivagem superficial generalizada</Highlight>, sem bactéria na bolha.</>,
  ],
  clinical: [
    "Predomina em neonatos e crianças; em adultos, procurar insuficiência renal, diabetes, neoplasia ou imunossupressão.",
    <>Pródromo febril e dor cutânea precedem eritema que começa na <Highlight>face e nas flexuras</Highlight>, forma bolhas flácidas e evolui para descamação com Nikolsky positivo.</>,
    <>Crosta e fissuras periorais ou perioculares são características; a <Highlight>mucosa oral é poupada</Highlight>.</>,
  ],
  histology: [
    <>Clivagem bem delimitada <Highlight>na camada granulosa ou logo abaixo dela</Highlight>.</>,
    <><Highlight>Inflamação mínima ou ausente</Highlight> na bolha e na derme superficial, sem organismos ao Gram.</>,
  ],
  evaluation: [
    <><Highlight>IFD negativa</Highlight>; a combinação com inflamação mínima e clínica compatível sustenta o diagnóstico.</>,
    "A bolha íntegra é estéril: cultivar conjuntiva, nasofaringe, região perianal ou outro foco purulento. Hemocultura costuma ser negativa na criança.",
    "Cocos na bolha favorecem impetigo bolhoso; IgG intercelular favorece pênfigo foliáceo; necrose epidérmica total e mucosite apontam para NET.",
  ],
  highlight: {
    title: "IFD negativa",
    bullets: [
      "Não há depósito autoimune intercelular.",
      <><Highlight>Inflamação mínima</Highlight> e bolha estéril reforçam o mecanismo por toxina circulante.</>,
      "Cultive o foco distante, não a bolha.",
    ],
    footer: "IFD negativa isoladamente não fecha o diagnóstico.",
  },
  pearl: <>criança com dor cutânea, eritema flexural, fissuras periorificiais e mucosa poupada, somados a clivagem granulosa estéril e <Highlight>IFD negativa</Highlight>, compõe o quadro da SSSS.</>,
};

const penfigoideMembranasMucosas: FocusedNote = {
  title: "Pênfigo cicatricial (penfigoide de membranas mucosas)",
  concept: [
    <>Doença bolhosa autoimune <Highlight>subepitelial</Highlight> das mucosas, com autoanticorpos contra componentes da junção (BP180, laminina 332).</>,
    <>Caracteriza-se pela tendência à <Highlight>cicatrização</Highlight> — daí o risco funcional.</>,
  ],
  clinical: [
    <><Highlight>Gengivite descamativa</Highlight> e erosões orais crônicas são a apresentação mais comum.</>,
    <>Conjuntivite cicatricial que evolui para simbléfaro e <Highlight>cegueira</Highlight> — exige avaliação oftalmológica precoce.</>,
    "A pele é acometida em 20–35% (variante de Brunsting-Perry, no couro cabeludo e face).",
  ],
  histology: [
    <>Bolha <Highlight>subepitelial sem acantólise</Highlight>, com infiltrado misto de predomínio neutrofílico.</>,
    "Menos eosinófilos que no penfigoide bolhoso.",
    "Lesões antigas mostram fibrose da submucosa ou da derme superior.",
  ],
  evaluation: [
    "Penfigoide bolhoso: mais eosinófilos, pele dominante e sem cicatriz.",
    "Pênfigo vulgar: acantólise e padrão intercelular na IFD.",
    "Anticorpos anti-laminina 332 obrigam a rastrear neoplasia sólida.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Depósitos <Highlight>lineares de IgG, IgA e/ou C3</Highlight> na junção dermoepidérmica.</>,
      "Biopsiar mucosa perilesional; a IFD tem rendimento maior que a histologia.",
      <>Na pele clivada por sal, os depósitos podem ficar no <Highlight>teto ou no assoalho</Highlight>, conforme o antígeno.</>,
    ],
    footer: "Encaminhamento oftalmológico é parte do diagnóstico.",
  },
  pearl: <>bolha subepitelial mucosa que <Highlight>cicatriza</Highlight>, com predomínio de neutrófilos sobre eosinófilos e IgG/IgA lineares na IFD, é penfigoide de membranas mucosas.</>,
};

// ---------------------------------------------------------------------------
// Bolhas subepidérmicas — imunomediadas
// ---------------------------------------------------------------------------

const penfigoideBolhoso: FocusedNote = {
  title: "Penfigoide bolhoso",
  concept: [
    <>Doença bolhosa autoimune subepidérmica por IgG contra <Highlight>BP180 (colágeno XVII)</Highlight> e BP230, hemidesmossomais, com clivagem na lâmina lúcida.</>,
    "É a dermatose bolhosa autoimune mais comum, típica do idoso.",
  ],
  clinical: [
    <>Idoso com prurido intenso e <Highlight>bolhas tensas</Highlight> sobre base urticada ou eritematosa; mucosa pouco ou nada acometida.</>,
    <>A <Highlight>fase não bolhosa</Highlight> — eczematosa, urticariforme ou só prurido — pode preceder as bolhas em semanas a meses.</>,
    "Distribuição simétrica em flexuras, abdome inferior e face interna das coxas.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>infiltrado rico em eosinófilos</Highlight> na derme superior e dentro da cavidade.</>,
    <>Na fase inicial pode haver apenas <Highlight>espongiose eosinofílica</Highlight>, sem bolha franca.</>,
    "Papilas dérmicas preservadas; ausência de acantólise e de necrose de queratinócitos.",
  ],
  evaluation: [
    <>Penfigoide bolhoso, herpes gestacional, epidermólise bolhosa adquirida, farmacodermia e insulto por artrópode podem <Highlight>simular-se mutuamente</Highlight> como bolha subepidérmica rica em eosinófilos — a morfologia isolada não fecha o caso.</>,
    "Herpes gestacional é o mesmo padrão histológico e imunológico, na gestante.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Depósito <Highlight>linear e contínuo de IgG e/ou C3</Highlight> ao longo da membrana basal, em pele perilesional.</>,
      <>Padrão <Highlight>“n-serrilhado”</Highlight> — o “u-serrilhado” pertence à epidermólise bolhosa adquirida.</>,
      <>Na pele clivada por sal, os depósitos ficam no <Highlight>teto</Highlight> (lado epidérmico).</>,
    ],
    footer: "ELISA anti-BP180 (NC16A) confirma e acompanha a atividade.",
  },
  pearl: <>bolha tensa de idoso com <Highlight>eosinófilos</Highlight> e IgG/C3 linear n-serrilhado no teto da clivagem salina define o penfigoide bolhoso.</>,
};

const herpesGestacional: FocusedNote = {
  title: "Herpes gestacional",
  concept: [
    <>Variante do penfigoide bolhoso <Highlight>deflagrada na gestação</Highlight> (ou pós-parto imediato), por IgG anti-BP180 com forte ativação do complemento.</>,
    "Apesar do nome, não tem relação com infecção herpética.",
  ],
  clinical: [
    <>Placas urticadas e <Highlight>vesicobolhas periumbilicais</Highlight> que se disseminam pelo tronco e membros, geralmente no 2º ou 3º trimestre.</>,
    "Prurido intenso; a face e as mucosas costumam ser poupadas.",
    "Recidiva em gestações seguintes, com início mais precoce e maior gravidade, e no pós-parto imediato.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>infiltrado rico em eosinófilos</Highlight> na derme papilar e na cavidade — indistinguível do penfigoide bolhoso.</>,
    <>Fase urticada precoce mostra apenas <Highlight>espongiose eosinofílica</Highlight> e edema papilar.</>,
    "Papilas preservadas, sem acantólise nem necrose de queratinócitos.",
  ],
  evaluation: [
    <>A histologia é idêntica ao penfigoide bolhoso — o contexto gestacional e a IFD fecham o diagnóstico. <Highlight>Farmacodermia, EBA e insulto por artrópode</Highlight> também podem simular esse mesmo padrão rico em eosinófilos.</>,
    "Erupção polimórfica da gravidez (PUPPP): poupa a região periumbilical e a IFD é negativa.",
    "Farmacodermia: relação temporal com fármaco e ausência de depósito linear contínuo específico.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Depósito <Highlight>linear de C3</Highlight> ao longo da membrana basal, quase sempre presente (mais sensível que o IgG).</>,
      "IgG linear presente em minoria dos casos, mas de alto valor quando positivo.",
      <>Padrão <Highlight>“n-serrilhado”</Highlight>, igual ao penfigoide bolhoso.</>,
    ],
    footer: "ELISA anti-BP180 (NC16A) confirma; risco de recorrência neonatal transitória.",
  },
  pearl: <>vesicobolhas periumbilicais pruriginosas na gestante, com <Highlight>C3 linear</Highlight> na IFD, definem o herpes gestacional — histologicamente idêntico ao penfigoide bolhoso.</>,
};

const epidermoliseBolhosaAdquirida: FocusedNote = {
  title: "Epidermólise bolhosa adquirida",
  concept: [
    <>Doença bolhosa autoimune subepidérmica por IgG contra o <Highlight>colágeno VII</Highlight>, componente das fibrilas de ancoragem.</>,
    "Existe uma forma mecanobolhosa clássica e formas inflamatórias que imitam outras bolhoses.",
  ],
  clinical: [
    <>Forma clássica: bolhas em <Highlight>áreas de trauma</Highlight> (dorso das mãos, cotovelos, joelhos) que curam com <Highlight>milia e cicatriz</Highlight>.</>,
    "Formas inflamatórias: bolhas tensas pruriginosas generalizadas, indistinguíveis clinicamente do penfigoide.",
    "Pode acometer mucosas, simulando penfigoide de membranas mucosas.",
  ],
  histology: [
    <>Bolha subepidérmica com infiltrado <Highlight>geralmente escasso</Highlight> na forma mecanobolhosa clássica.</>,
    "Nas formas inflamatórias, o infiltrado é misto, com neutrófilos e eosinófilos, podendo mimetizar penfigoide.",
    <>Fibrose e <Highlight>milia</Highlight> nas lesões antigas favorecem EBA sobre penfigoide bolhoso.</>,
  ],
  evaluation: [
    <>A morfologia isolada não distingue de penfigoide, herpes gestacional ou farmacodermia nas formas inflamatórias ricas em eosinófilos — a <Highlight>imunopatologia é obrigatória</Highlight>.</>,
    <>Atenção: a EBA pode se apresentar com padrão <Highlight>pauci-inflamatório e predominantemente neutrofílico</Highlight>, fugindo do eosinófilo esperado nesse ramo do algoritmo.</>,
    "Cicatriz e milia direcionam para EBA; sua ausência, para penfigoide.",
    "Porfiria cutânea tarda entra no diferencial da forma mecanobolhosa (papilas em festão, material hialino perivascular).",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>IgG/C3 linear na junção, com padrão <Highlight>“u-serrilhado”</Highlight> (versus n-serrilhado do penfigoide).</>,
      <>Na pele clivada por sal, os depósitos ficam no <Highlight>assoalho</Highlight> (lado dérmico) — oposto ao penfigoide.</>,
      "ELISA/imunoblot anti-colágeno VII confirma.",
    ],
    footer: "Sem clivagem salina ou análise de serrilhado, o caso fica indefinido.",
  },
  pearl: <>bolha subepidérmica que cicatriza com <Highlight>milia</Highlight>, com depósitos no <Highlight>assoalho</Highlight> da clivagem salina em padrão u-serrilhado, define a epidermólise bolhosa adquirida.</>,
};

const farmacodermia: FocusedNote = {
  title: "Farmacodermia (penfigoide induzido por droga)",
  concept: [
    <>Reação bolhosa subepidérmica <Highlight>deflagrada por fármaco</Highlight>, clínica e histologicamente sobreponível ao penfigoide bolhoso.</>,
    <>Antagonistas de <Highlight>DPP-4 (gliptinas)</Highlight>, diuréticos, furosemida e alguns antibióticos são os gatilhos mais descritos.</>,
  ],
  clinical: [
    "Bolhas tensas pruriginosas que surgem semanas a meses após o início do fármaco suspeito.",
    <>Pode ter <Highlight>menos base urticada</Highlight> e distribuição mais atípica que o penfigoide idiopático.</>,
    "Tende a melhorar com a suspensão do fármaco, embora a resposta possa ser lenta.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>eosinófilos</Highlight>, indistinguível do penfigoide bolhoso clássico.</>,
    "Pode haver componente neutrofílico mais proeminente em alguns casos induzidos por gliptina.",
    "Papilas preservadas, sem acantólise.",
  ],
  evaluation: [
    <>A histologia não separa de penfigoide bolhoso, herpes gestacional ou EBA — todos podem <Highlight>simular-se</Highlight> como bolha subepidérmica eosinofílica; a anamnese farmacológica cuidadosa é decisiva.</>,
    "IFD costuma ser positiva como no penfigoide idiopático (IgG/C3 lineares).",
    "Melhora após a suspensão do fármaco reforça a causalidade, mas não é imediata.",
  ],
  highlight: {
    title: "Anamnese",
    bullets: [
      <>Revisar <Highlight>fármacos iniciados nos últimos meses</Highlight>, com atenção especial às gliptinas.</>,
      "IFD segue o mesmo padrão do penfigoide bolhoso — não diferencia por si só.",
      "Suspender o agente suspeito é parte do diagnóstico e do tratamento.",
    ],
    footer: "Quando a IFD é idêntica ao penfigoide, é a história medicamentosa que fecha o caso.",
  },
  pearl: <>bolha subepidérmica eosinofílica <Highlight>idêntica ao penfigoide</Highlight>, mas iniciada após novo fármaco (sobretudo gliptina), aponta para farmacodermia bolhosa.</>,
};

const penfigoideEHerpesGestationis: FocusedNote = {
  title: "Penfigoide bolhoso e herpes gestationis",
  concept: [
    <>Doenças bolhosas autoimunes subepidérmicas por IgG contra <Highlight>BP180 (colágeno XVII)</Highlight> e BP230, com clivagem na lâmina lúcida.</>,
    <>O <Highlight>herpes gestationis</Highlight> é a mesma doença deflagrada na gestação, com anti-BP180 e ativação do complemento.</>,
  ],
  clinical: [
    <>Idoso com prurido intenso e <Highlight>bolhas tensas</Highlight> sobre pele urticada; mucosa pouco ou nada acometida.</>,
    <>A <Highlight>fase não bolhosa</Highlight> — eczematosa, urticariforme ou só prurido — precede as bolhas em semanas a meses.</>,
    "Na gestação, lesões começam periumbilicais e recidivam em gestações seguintes e no pós-parto.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>infiltrado rico em eosinófilos</Highlight> na derme superior e dentro da cavidade.</>,
    <>Na fase inicial pode haver apenas <Highlight>espongiose eosinofílica</Highlight>, sem bolha franca.</>,
    "Papilas dérmicas preservadas; ausência de acantólise e de necrose de queratinócitos.",
  ],
  evaluation: [
    "Picada de artrópode reproduz o quadro histológico — a IFD é o que decide.",
    "Epidermólise bolhosa adquirida: pouca inflamação ou neutrófilos, cicatriz e milia.",
    "Dermatose por IgA linear e dermatite herpetiforme têm neutrófilos papilares.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Depósito <Highlight>linear e contínuo de IgG e/ou C3</Highlight> ao longo da membrana basal, em pele perilesional.</>,
      <>Padrão <Highlight>“n-serrilhado”</Highlight> — o “u-serrilhado” pertence à epidermólise bolhosa adquirida.</>,
      <>Na pele clivada por sal, os depósitos ficam no <Highlight>teto</Highlight> (lado epidérmico).</>,
    ],
    footer: "ELISA anti-BP180 (NC16A) confirma e acompanha a atividade.",
  },
  pearl: <>bolha tensa com <Highlight>eosinófilos</Highlight> e IgG/C3 linear n-serrilhado é penfigoide; na gestante, o mesmo padrão chama-se herpes gestationis.</>,
};

const penfigoidePobreEmCelulas: FocusedNote = {
  title: "Penfigoide bolhoso e herpes gestationis — formas pobres em células",
  concept: [
    <>Mesmo mecanismo do penfigoide clássico, mas com <Highlight>infiltrado escasso</Highlight> — a morfologia perde poder diagnóstico.</>,
    "Ocorre em lesões precoces, em pele previamente tratada com corticoide e nas formas “cell-poor”.",
  ],
  clinical: [
    "Bolhas tensas sobre pele de aspecto normal, sem base urticada evidente.",
    "Prurido pode ser o único sintoma por longos períodos.",
    "Idoso com prurido crônico inexplicado merece IFD mesmo sem bolha.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>poucos neutrófilos e eosinófilos</Highlight>, papilas preservadas.</>,
    "Sem acantólise, sem necrose de queratinócitos e sem fibrose.",
    "O diferencial morfológico inclui porfiria, epidermólise bolhosa e bolha por trauma.",
  ],
  evaluation: [
    <>Porfiria: papilas <Highlight>em festão</Highlight>, material hialino perivascular PAS-positivo e elastose solar.</>,
    "Epidermólise bolhosa hereditária: contexto neonatal/infantil e ausência de depósitos imunes.",
    "Bolha friccional ou por sucção: história de trauma e ausência de imunorreagentes.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Bolha subepidérmica pauci-inflamatória <Highlight>sempre pede IFD</Highlight> — a histologia não decide.</>,
      "IgG e/ou C3 linear na junção = penfigoide, ainda que sem eosinófilos.",
      "Ausência de depósitos redireciona para porfiria, trauma ou EB hereditária.",
    ],
    footer: "Biopsiar pele perilesional para IFD e lesão íntegra para HE.",
  },
  pearl: <>quando a bolha subepidérmica é <Highlight>pobre em células</Highlight>, o diagnóstico deixa de ser morfológico: IFD e pesquisa de porfirinas resolvem a maioria dos casos.</>,
};

const penfigoideEEba: FocusedNote = {
  title: "Penfigoide bolhoso, herpes gestationis e epidermólise bolhosa adquirida",
  concept: [
    <>Três doenças com bolha subepidérmica e eosinófilos, separadas pelo <Highlight>antígeno-alvo</Highlight>.</>,
    <>Penfigoide e herpes gestationis: <Highlight>BP180/BP230</Highlight>. EBA: <Highlight>colágeno VII</Highlight> das fibrilas de ancoragem.</>,
  ],
  clinical: [
    "Penfigoide: idoso, prurido, bolhas tensas sobre base urticada, sem cicatriz.",
    "Herpes gestationis: gestante, início periumbilical, recidiva no pós-parto.",
    <>EBA: bolhas em <Highlight>áreas de trauma</Highlight> que curam com <Highlight>milia e cicatriz</Highlight>; formas inflamatórias imitam o penfigoide.</>,
  ],
  histology: [
    "Bolha subepidérmica com eosinófilos na derme papilar e na cavidade nas três entidades.",
    <>Na EBA mecanobolhosa clássica o infiltrado é <Highlight>mínimo</Highlight>; nas inflamatórias é misto, com neutrófilos.</>,
    "Fibrose e milia nas lesões antigas favorecem EBA.",
  ],
  evaluation: [
    "A morfologia não distingue as três — a imunopatologia é obrigatória.",
    "Cicatriz e milia direcionam para EBA; sua ausência, para penfigoide.",
    "Porfiria cutânea tarda entra no diferencial da forma mecanobolhosa.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>IgG/C3 linear na junção nas três; o padrão de serrilhado separa: <Highlight>n-serrilhado</Highlight> = penfigoide, <Highlight>u-serrilhado</Highlight> = EBA.</>,
      <>Pele clivada por sal: depósitos no <Highlight>teto</Highlight> no penfigoide, no <Highlight>assoalho</Highlight> na EBA.</>,
      "ELISA anti-BP180 versus anti-colágeno VII confirma.",
    ],
    footer: "Sem clivagem salina ou análise de serrilhado, o caso fica indefinido.",
  },
  pearl: <>eosinófilos numa bolha subepidérmica levam a três suspeitos; quem decide é o <Highlight>lado do split salino</Highlight> — teto para penfigoide, assoalho para EBA.</>,
};

const dermatiteHerpetiformeGrupo: FocusedNote = {
  title: "Dermatite herpetiforme, dermatose por IgA linear e simuladores",
  concept: [
    <>Bolhas subepidérmicas <Highlight>neutrofílicas</Highlight> mediadas por IgA, agrupadas pelo padrão de microabscessos papilares.</>,
    <>Dermatite herpetiforme é a expressão cutânea da <Highlight>doença celíaca</Highlight> (IgA anti-transglutaminase 3).</>,
  ],
  clinical: [
    <>Dermatite herpetiforme: pápulo-vesículas <Highlight>muito pruriginosas e escoriadas</Highlight> em cotovelos, joelhos, nádegas e couro cabeludo.</>,
    <>IgA linear: bolhas em <Highlight>“colar de pérolas”</Highlight> na periferia de placas anulares; forma infantil e forma por <Highlight>vancomicina</Highlight>.</>,
    "A erupção medicamentosa tipo dermatite herpetiforme surge dias a semanas após o fármaco.",
  ],
  histology: [
    <><Highlight>Neutrófilos preenchendo as papilas dérmicas</Highlight>, poupando as pontas das cristas interpapilares.</>,
    "Bolha subepidérmica com predomínio neutrofílico; eosinófilos escassos.",
    <><Highlight>Bandas nucleares e poeira nuclear</Highlight> na papila, sem mucina abundante na derme reticular.</>,
    "Biopsiar vesícula íntegra pequena ou, na falta dela, área de eritema.",
  ],
  evaluation: [
    "As três entidades são histologicamente sobreponíveis — só a IFD separa.",
    "Lúpus bolhoso também é neutrofílico, mas mostra mucina e tem IFD granular múltipla.",
    "EBA inflamatória pode ser neutrofílica: procurar padrão u-serrilhado.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <><Highlight>IgA granular nas papilas dérmicas</Highlight> = dermatite herpetiforme (85% dos casos).</>,
      <><Highlight>IgA linear e contínua</Highlight> na membrana basal = dermatose por IgA linear.</>,
      <>Biopsiar pele <Highlight>normal adjacente</Highlight> à lesão: na lesional o infiltrado destrói o depósito.</>,
    ],
    footer: "Na dermatite herpetiforme, complete com IgA anti-transglutaminase e antiendomísio.",
  },
  pearl: <>neutrófilos nas papilas são apenas o padrão; <Highlight>granular = herpetiforme, linear = IgA linear</Highlight> — e o sítio da biópsia para IFD é pele sã ao lado da lesão.</>,
};

const epidermoliseBolhosaGrupo: FocusedNote = {
  title: "Epidermólises bolhosas",
  concept: [
    <>Grupo de doenças da <Highlight>fragilidade dermoepidérmica</Highlight>, hereditárias ou adquirida (EBA, autoimune anti-colágeno VII).</>,
    <>A classificação hereditária segue o <Highlight>nível ultraestrutural da clivagem</Highlight>: simples, juncional e distrófica.</>,
  ],
  clinical: [
    "Bolhas desencadeadas por trauma mínimo, desde o nascimento nas formas hereditárias.",
    <>Juncional: tecido de granulação periorificial, distrofia ungueal e defeitos de esmalte. <Highlight>Distrófica</Highlight>: cicatriz, milia, sindactilia e risco de carcinoma espinocelular.</>,
    <>Síndrome de Bart: <Highlight>aplasia cutânea congênita</Highlight> nos membros associada a epidermólise bolhosa.</>,
  ],
  histology: [
    <>Bolha subepidérmica <Highlight>quase sem infiltrado</Highlight> nas formas mecanobolhosas.</>,
    "O HE não determina o nível preciso da clivagem — a distinção é ultraestrutural ou por mapeamento antigênico.",
    "Formas inflamatórias de EBA mostram infiltrado misto com neutrófilos.",
  ],
  evaluation: [
    <>Hereditárias: <Highlight>sem depósitos imunes</Highlight>; diagnóstico por mapeamento por imunofluorescência e genética.</>,
    "EBA: IgG na junção, padrão u-serrilhado, no assoalho da pele clivada por sal.",
    "Porfiria e bolha por trauma completam o diferencial da bolha pauci-inflamatória.",
  ],
  highlight: {
    title: "Mapeamento antigênico",
    bullets: [
      "Define o nível exato da clivagem e o antígeno ausente, orientando o subtipo hereditário.",
      <>Sempre acompanhado de <Highlight>IFD</Highlight>, que é negativa nas formas hereditárias e positiva na adquirida.</>,
      "Confirmação final por sequenciamento genético.",
    ],
    footer: "Bolha pauci-inflamatória em recém-nascido: pense EB antes de doença autoimune.",
  },
  pearl: <>na bolha subepidérmica <Highlight>sem inflamação</Highlight>, a idade decide o caminho: no recém-nascido, mapeamento antigênico e genética; no adulto, IFD e porfirinas.</>,
};

const lupusBolhoso: FocusedNote = {
  title: "Lúpus eritematoso sistêmico bolhoso",
  concept: [
    <>Erupção bolhosa subepidérmica do LES por autoanticorpos contra o <Highlight>colágeno VII</Highlight>, distinta das lesões clássicas de lúpus.</>,
    "Implica doença sistêmica ativa e costuma responder rapidamente à dapsona.",
  ],
  clinical: [
    "Bolhas tensas de aparecimento rápido em tronco, pescoço e áreas fotoexpostas, em paciente com LES conhecido.",
    "Pouco prurido; cura sem cicatriz, ao contrário da EBA.",
    "Critérios de LES devem estar presentes para o diagnóstico.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>neutrófilos nas papilas</Highlight>, muito semelhante à dermatite herpetiforme.</>,
    <>Diferença útil: <Highlight>mucina abundante</Highlight> na derme reticular.</>,
    "Pode haver leucocitoclasia e alteração de interface discreta.",
  ],
  evaluation: [
    "Dermatite herpetiforme e IgA linear: sem mucina e com IFD de padrão distinto.",
    "EBA compartilha o alvo (colágeno VII), mas ocorre fora do contexto de LES e deixa cicatriz.",
    "Vasculite leucocitoclástica bolhosa mostra fibrina na parede vascular.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Depósitos <Highlight>granulares ou lineares de IgG, IgA, IgM e C3</Highlight> na junção — o “full house” lúpico.</>,
      "Mucina na derme reticular é a pista morfológica que antecipa o resultado.",
    ],
    footer: "Sorologia e critérios de LES completam o diagnóstico.",
  },
  pearl: <>bolha neutrofílica subepidérmica <Highlight>com mucina</Highlight> em paciente com LES é lúpus bolhoso; sem mucina, pense em dermatite herpetiforme ou IgA linear.</>,
};

const porfirias: FocusedNote = {
  title: "Porfirias cutâneas",
  concept: [
    <>Bolha por <Highlight>fotossensibilização de porfirinas</Highlight> acumuladas, com fragilidade da junção dermoepidérmica.</>,
    "Porfiria cutânea tarda é a mais comum; formas variegata, eritropoiética, induzida por droga ou por diálise repetem o padrão.",
  ],
  clinical: [
    <>Bolhas e erosões em <Highlight>dorso das mãos</Highlight>, com <Highlight>fragilidade cutânea</Highlight>, milia e cicatrizes.</>,
    "Hipertricose malar, hiperpigmentação e alterações esclerodermiformes acompanham.",
    "Investigar álcool, hepatite C, HIV, estrogênio, hemocromatose e diálise.",
  ],
  histology: [
    <>Bolha subepidérmica <Highlight>pauci-inflamatória</Highlight>, com papilas dérmicas preservadas que protruem para a cavidade (<Highlight>festonamento</Highlight>).</>,
    <>Material <Highlight>hialino PAS-positivo</Highlight> em torno dos vasos da derme papilar.</>,
    "Elastose solar extensa; “caterpillar bodies” no teto da bolha.",
  ],
  evaluation: [
    "EBA mecanobolhosa é praticamente idêntica — a IFD separa.",
    "Pseudoporfiria (AINEs, diálise, bronzeamento artificial) tem a mesma histologia com porfirinas normais.",
    "Penfigoide pobre em células entra no diferencial da bolha pauci-inflamatória.",
  ],
  highlight: {
    title: "Festonamento + PAS",
    bullets: [
      <>Papilas <Highlight>em festão</Highlight> no assoalho da bolha, com pouca inflamação.</>,
      <>Material hialino perivascular <Highlight>PAS-positivo e diástase-resistente</Highlight>.</>,
      "IFD pode mostrar depósitos inespecíficos em vasos e junção — não confundir com penfigoide.",
    ],
    footer: "Confirmação: porfirinas urinárias, fecais e plasmáticas.",
  },
  pearl: <>bolha das mãos com <Highlight>festonamento papilar</Highlight> e hialino PAS-positivo perivascular é porfiria — dose de porfirinas confirma e afasta pseudoporfiria.</>,
};

// ---------------------------------------------------------------------------
// Bolhas subepidérmicas — não imunomediadas e de vizinhança
// ---------------------------------------------------------------------------

const liquenEscleroso: FocusedNote = {
  title: "Líquen escleroso e atrófico (e morfeia)",
  concept: [
    <>Dermatose inflamatória crônica com <Highlight>esclerose da derme papilar</Highlight>, que pode clivar a junção e formar bolha.</>,
    "Compartilha espectro com a morfeia, cuja esclerose é da derme reticular.",
  ],
  clinical: [
    <>Placas brancas <Highlight>atróficas e enrugadas</Highlight>, tipicamente anogenitais, com prurido e dispareunia.</>,
    "Púrpura e bolhas hemorrágicas sobre as placas são comuns e assustam.",
    "Risco de carcinoma espinocelular nas lesões genitais de longa data.",
  ],
  histology: [
    <>Epiderme atrófica com <Highlight>hiperceratose e tampões foliculares</Highlight>, sobre alteração vacuolar de interface.</>,
    <><Highlight>Homogeneização/edema em faixa da derme papilar</Highlight>, com infiltrado linfocitário em banda logo abaixo.</>,
    "A clivagem ocorre dentro da zona edemaciada, gerando bolha subepidérmica hemorrágica.",
  ],
  evaluation: [
    "Morfeia: esclerose da derme reticular, com anexos aprisionados e epiderme normal.",
    "Líquen plano: infiltrado liquenoide sem faixa de homogeneização papilar.",
    "Toda dermatite de interface genital deve levantar a hipótese de líquen escleroso.",
  ],
  highlight: {
    title: "Faixa papilar",
    bullets: [
      <>Zona <Highlight>pálida e homogênea</Highlight> na derme papilar, com linfócitos empurrados para baixo.</>,
      "Interface vacuolar + tampão folicular + atrofia completam a tríade.",
    ],
    footer: "IFD é negativa — útil quando a bolha hemorrágica sugere doença autoimune.",
  },
  pearl: <>bolha hemorrágica sobre placa branca anogenital, com <Highlight>faixa homogênea na derme papilar</Highlight>, é líquen escleroso — não penfigoide.</>,
};

const liquenPlanoBolhoso: FocusedNote = {
  title: "Líquen plano bolhoso",
  concept: [
    <>Bolha que surge <Highlight>sobre lesões de líquen plano</Highlight>, por dano intenso da camada basal e clivagem no espaço de Max-Joseph.</>,
    "Distinto do líquen plano penfigoide, no qual há autoanticorpos anti-BP180.",
  ],
  clinical: [
    "Bolhas restritas às pápulas violáceas poligonais preexistentes, sobretudo nas pernas.",
    "Prurido intenso e estrias de Wickham nas lesões vizinhas.",
    "Mucosa oral frequentemente acometida pelo líquen plano de base.",
  ],
  histology: [
    <>Infiltrado <Highlight>liquenoide em banda</Highlight> com hipergranulose e acantose serrilhada.</>,
    <>Degeneração da camada basal com <Highlight>corpos coloides</Highlight> e clivagem subepidérmica.</>,
    "Ausência de eosinófilos abundantes; sem acantólise.",
  ],
  evaluation: [
    <><Highlight>Líquen plano penfigoide:</Highlight> bolhas em pele sã, longe das pápulas, com IFD linear na junção.</>,
    "Eritema multiforme e erupção fixa têm interface sem banda liquenoide organizada.",
    "IFD do líquen plano mostra corpos coloides com IgM, sem depósito linear.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Corpos coloides com <Highlight>IgM</Highlight> e fibrinogênio “desgrenhado” na junção = líquen plano.</>,
      <>Depósito <Highlight>linear de IgG/C3</Highlight> muda o diagnóstico para líquen plano penfigoide.</>,
    ],
    footer: "Bolha em pele sã, e não sobre a pápula, é o sinal clínico de alerta.",
  },
  pearl: <>bolha <Highlight>sobre a pápula liquenoide</Highlight> é líquen plano bolhoso; bolha em pele normal ao redor exige IFD para excluir líquen plano penfigoide.</>,
};

const vasculiteLeucocitoclasticaBolhosa: FocusedNote = {
  title: "Vasculite leucocitoclástica",
  concept: [
    <>Vasculite de pequenos vasos por <Highlight>imunocomplexos</Highlight>, cuja necrose e edema podem clivar a junção e formar bolha.</>,
    "Fármacos, infecções, doenças autoimunes e neoplasias são os gatilhos.",
  ],
  clinical: [
    <><Highlight>Púrpura palpável</Highlight> em membros inferiores, por vezes com vesículas, bolhas hemorrágicas e úlceras.</>,
    "Surtos ligados a fármaco ou infecção recente; ardor mais que prurido.",
    "Investigar acometimento renal, articular e gastrointestinal.",
  ],
  histology: [
    <><Highlight>Necrose fibrinoide</Highlight> da parede das vênulas pós-capilares, com infiltrado neutrofílico mural.</>,
    <><Highlight>Leucocitoclasia</Highlight> e hemácias extravasadas ao redor dos vasos.</>,
    "Edema papilar intenso pode gerar bolha subepidérmica com teto necrótico.",
  ],
  evaluation: [
    <><Highlight>Vasculite séptica:</Highlight> trombos, menos leucocitoclasia e microrganismos nos vasos.</>,
    "Dermatose neutrofílica (Sweet) tem neutrófilos sem fibrina na parede vascular.",
    "Vasculopatia livedoide mostra trombose com pouca inflamação.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Colher em lesão com <Highlight>menos de 24–48 h</Highlight>: depois, os depósitos desaparecem.</>,
      <><Highlight>IgA</Highlight> perivascular caracteriza a vasculite por IgA (Henoch-Schönlein).</>,
      "IgM/IgG/C3 granulares indicam vasculite por imunocomplexos de outra origem.",
    ],
    footer: "Bolha aqui é consequência do dano vascular, não do alvo autoimune.",
  },
  pearl: <>fibrina na parede vascular com leucocitoclasia explica a bolha; a <Highlight>IFD precoce</Highlight> é o que identifica o subtipo por IgA.</>,
};

const vasculiteSeptica: FocusedNote = {
  title: "Vasculite séptica",
  concept: [
    <>Invasão vascular <Highlight>direta por microrganismos</Highlight>, com trombose e necrose isquêmica — não é fenômeno por imunocomplexos.</>,
    "Meningococcemia, gonococcemia, endocardite e sepse por gram-negativos são as causas clássicas.",
  ],
  clinical: [
    "Paciente febril e toxemiado, com pústulas hemorrágicas acrais, bolhas e necrose.",
    <>Poucas lesões, distribuição <Highlight>acral e assimétrica</Highlight> — diferente da púrpura palpável simétrica.</>,
    "É emergência: exige hemocultura e antibiótico imediatos.",
  ],
  histology: [
    <><Highlight>Trombos de fibrina</Highlight> nos vasos dérmicos, com necrose e hemorragia.</>,
    "Infiltrado neutrofílico com pouca leucocitoclasia em relação à extensão do dano.",
    <>Microrganismos podem ser vistos <Highlight>dentro dos vasos</Highlight> ou no infiltrado.</>,
  ],
  evaluation: [
    "Vasculite leucocitoclástica: fibrina mural com leucocitoclasia proeminente, sem trombos dominantes.",
    "Sempre pedir Gram, PAS, Grocott e cultura de tecido quando houver trombose neutrofílica.",
    "Ectima gangrenoso é a forma por Pseudomonas, com invasão vascular maciça.",
  ],
  highlight: {
    title: "Colorações e cultura",
    bullets: [
      <>Trombose + neutrófilos = <Highlight>procurar microrganismo</Highlight> antes de fechar vasculite.</>,
      "Gram, PAS e Grocott no bloco; cultura de fragmento a fresco.",
    ],
    footer: "Hemocultura em paralelo — o diagnóstico é urgente.",
  },
  pearl: <>trombo dominando a cena, com pouca leucocitoclasia e paciente séptico, é <Highlight>vasculite séptica</Highlight> até que colorações e cultura digam o contrário.</>,
};

const piodermaGangrenoso: FocusedNote = {
  title: "Pioderma gangrenoso",
  concept: [
    <>Dermatose <Highlight>neutrofílica</Highlight> ulcerativa, de diagnóstico por exclusão, associada a DII, artrites e doenças hematológicas.</>,
    <>Apresenta <Highlight>patergia</Highlight>: o trauma, inclusive o desbridamento, agrava a lesão.</>,
  ],
  clinical: [
    <>Pústula ou bolha que ulcera rapidamente, com <Highlight>borda violácea escavada</Highlight> e dor intensa.</>,
    "Pernas são o sítio preferencial; a variante bolhosa associa-se a neoplasia hematológica.",
    "Cura com cicatriz cribriforme.",
  ],
  histology: [
    <>Infiltrado <Highlight>neutrofílico denso</Highlight> com abscesso e necrose dérmica, ulcerando a epiderme.</>,
    "Bolha subepidérmica na variante bolhosa, com edema e neutrófilos.",
    "Vasculite pode existir, mas é secundária ao processo neutrofílico.",
  ],
  evaluation: [
    "É diagnóstico de exclusão: afastar infecção, vasculite, neoplasia e causas vaso-oclusivas.",
    "Colorações e culturas negativas são parte obrigatória do laudo.",
    "Síndrome de Sweet é a contraparte não ulcerativa do mesmo espectro.",
  ],
  highlight: {
    title: "Exclusão obrigatória",
    bullets: [
      <>Gram, PAS, Grocott, Ziehl e <Highlight>cultura de tecido</Highlight> negativos são pré-requisito.</>,
      "Biopsiar a borda ativa, incluindo pele perilesional.",
    ],
    footer: "Rastrear DII e discrasias — a variante bolhosa é marcadora.",
  },
  pearl: <>úlcera dolorosa de borda violácea com <Highlight>neutrófilos estéreis</Highlight> é pioderma gangrenoso — mas só depois de culturas negativas.</>,
};

const celuliteBolhosa: FocusedNote = {
  title: "Celulite",
  concept: [
    <>Infecção bacteriana da derme profunda e do subcutâneo, em geral por <Highlight>estreptococo do grupo A</Highlight> ou S. aureus.</>,
    "O edema dérmico intenso pode descolar a epiderme e formar bolha.",
  ],
  clinical: [
    "Eritema mal delimitado, quente e doloroso, de instalação rápida, com febre e calafrios.",
    "Bolhas, pústulas e necrose indicam infecção mais grave.",
    "Porta de entrada (intertrigo interdigital, úlcera, trauma) deve ser procurada.",
  ],
  histology: [
    <>Edema dérmico difuso com <Highlight>bolha subepidérmica</Highlight> por descolamento.</>,
    "Infiltrado de neutrófilos e linfócitos na derme e no subcutâneo, com vasos e linfáticos dilatados.",
    "Bactérias raramente são visíveis nos cortes.",
  ],
  evaluation: [
    <>Considerar as <Highlight>“pseudocelulites”</Highlight>: dermatite de estase, picada, paniculite, síndrome de Sweet.</>,
    "Fasciíte necrosante: dor desproporcional, necrose e toxemia — emergência cirúrgica.",
    "O diagnóstico é predominantemente clínico; a biópsia serve para excluir simuladores.",
  ],
  highlight: {
    title: "Simuladores",
    bullets: [
      <>Quadro bilateral e crônico favorece <Highlight>dermatite de estase</Highlight>, não celulite.</>,
      "Gram e cultura de tecido quando houver bolha, pústula ou imunossupressão.",
    ],
    footer: "Bolha na celulite é consequência do edema, não de autoimunidade.",
  },
  pearl: <>a celulite raramente se confirma na histologia — antes de aceitá-la, percorra a lista de <Highlight>pseudocelulites</Highlight>, sobretudo se o quadro for bilateral.</>,
};

const urticariaPigmentosa: FocusedNote = {
  title: "Urticária pigmentosa",
  concept: [
    <>Mastocitose cutânea com acúmulo de <Highlight>mastócitos</Highlight> na derme; a degranulação maciça pode gerar bolha.</>,
    "A forma bolhosa é típica dos primeiros dois anos de vida.",
  ],
  clinical: [
    <>Máculas e pápulas castanhas que <Highlight>urticam ao atrito</Highlight> — sinal de Darier.</>,
    "No lactente, bolhas tensas e hemorrágicas podem dominar o quadro.",
    "Flushing, prurido e sintomas sistêmicos após calor, atrito ou fármacos liberadores de histamina.",
  ],
  histology: [
    <>Infiltrado dérmico de <Highlight>mastócitos monomorfos</Highlight>, perivascular ou em lençol na derme papilar.</>,
    <>Bolha subepidérmica com <Highlight>eosinófilos</Highlight> e edema quando há degranulação intensa.</>,
    "Os mastócitos podem passar por linfócitos ou histiócitos no HE — o achado é facilmente perdido.",
  ],
  evaluation: [
    "Penfigoide e IgA linear da infância entram no diferencial da bolha do lactente — IFD resolve.",
    "Picada de artrópode e mastocitose reativa mostram mastócitos esparsos, não em lençol.",
    "Triptase sérica e avaliação sistêmica nas formas extensas.",
  ],
  highlight: {
    title: "Giemsa / triptase",
    bullets: [
      <>Toda bolha do lactente com <Highlight>eosinófilos</Highlight> merece coloração para mastócitos.</>,
      <>Giemsa, azul de toluidina ou <Highlight>imuno-histoquímica (triptase, CD117)</Highlight> confirmam.</>,
    ],
    footer: "Sinal de Darier positivo dispensa dúvidas clínicas.",
  },
  pearl: <>mastócitos passam despercebidos no HE: em bolha de lactente com eosinófilos, peça <Highlight>triptase ou Giemsa</Highlight> antes de fechar penfigoide.</>,
};

const amiloidoseBolhosa: FocusedNote = {
  title: "Amiloidose bolhosa",
  concept: [
    <>Depósito de amiloide <Highlight>AL</Highlight> em torno de vasos e no colágeno, na amiloidose sistêmica associada a discrasia plasmocitária.</>,
    "A fragilidade vascular e dérmica gera bolhas hemorrágicas ao mínimo trauma.",
  ],
  clinical: [
    <>Bolhas <Highlight>hemorrágicas</Highlight> e púrpura ao trauma mínimo, incluindo <Highlight>púrpura periorbitária</Highlight> (“olhos de guaxinim”).</>,
    "Macroglossia, pápulas céreas e sintomas sistêmicos (renal, cardíaco, neuropatia).",
    "Achado que obriga a investigar mieloma e amiloidose sistêmica.",
  ],
  histology: [
    <>Material <Highlight>eosinofílico amorfo</Highlight> na derme papilar e ao redor de vasos e anexos.</>,
    "Clivagem subepidérmica ou intradérmica através do depósito, com hemorragia e pouca inflamação.",
    "Vasos com paredes espessadas e rígidas pelo depósito.",
  ],
  evaluation: [
    "Porfiria e EBA compartilham a bolha pauci-inflamatória com fragilidade.",
    <>Amiloidose <Highlight>maculosa e liquenoide</Highlight> são cutâneas puras, sem depósito perivascular profundo nem bolha.</>,
    "Depósito perivascular difuso é o que sinaliza doença sistêmica.",
  ],
  highlight: {
    title: "Vermelho Congo",
    bullets: [
      <>Birrefringência <Highlight>verde-maçã</Highlight> à luz polarizada confirma o amiloide.</>,
      "Tioflavina T e imuno-histoquímica para cadeias leves complementam.",
      "Eletroforese de proteínas e imunofixação são obrigatórias.",
    ],
    footer: "Bolha hemorrágica sem inflamação: sempre considere amiloide.",
  },
  pearl: <>bolha hemorrágica ao trauma mínimo, com material amorfo perivascular <Highlight>Congo-positivo</Highlight>, é amiloidose sistêmica até prova em contrário.</>,
};

const bolhaSobreCicatriz: FocusedNote = {
  title: "Bolha sobre cicatriz",
  concept: [
    <>Clivagem por <Highlight>fragilidade mecânica</Highlight> na junção alterada da pele cicatricial, sem mecanismo imunológico.</>,
    "Fenômeno local, geralmente após trauma, atrito ou edema.",
  ],
  clinical: [
    "Bolha tensa restrita ao território de uma cicatriz prévia.",
    "Ausência de lesões a distância e de prurido generalizado.",
    "Resolve com a proteção da área.",
  ],
  histology: [
    <>Bolha subepidérmica sobre <Highlight>derme fibrótica</Highlight>, com colágeno em feixes paralelos e anexos ausentes.</>,
    "Infiltrado escasso, desproporcional ao tamanho da bolha.",
    "Epiderme adelgaçada, com apagamento das cristas.",
  ],
  evaluation: [
    <>A <Highlight>EBA</Highlight> também deixa cicatriz e milia — a IFD é obrigatória se houver lesões fora da cicatriz.</>,
    "Penfigoide pode ter fenômeno de Koebner sobre cicatriz.",
    "Porfiria e trauma repetido completam o diferencial.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Negativa: confirma a natureza <Highlight>puramente mecânica</Highlight>.</>,
      "Positiva: reclassifica o caso como doença bolhosa autoimune localizada.",
    ],
    footer: "Bolha restrita à cicatriz + IFD negativa = fenômeno local.",
  },
  pearl: <>a fibrose da cicatriz é um <Highlight>plano de clivagem pronto</Highlight>; só a ausência de lesões fora dela e a IFD negativa autorizam o diagnóstico mecânico.</>,
};

const bolhaEletrodissecacao: FocusedNote = {
  title: "Bolha secundária a ceratose actínica eletrodissecada",
  concept: [
    <>Bolha <Highlight>iatrogênica</Highlight>, por dano térmico da eletrodissecação sobre pele fotodanificada e frágil.</>,
    "É um artefato terapêutico, não uma doença bolhosa.",
  ],
  clinical: [
    "Bolha localizada exatamente no sítio tratado, surgindo em horas a dias.",
    "Base com elastose e outras ceratoses actínicas ao redor.",
    "Evolui para crosta e reepitelização.",
  ],
  histology: [
    <>Clivagem subepidérmica com <Highlight>alteração térmica</Highlight> — colágeno homogeneizado e núcleos alongados “em fila”.</>,
    <><Highlight>Elastose solar</Highlight> acentuada e atipia queratinocítica residual nas bordas.</>,
    "Infiltrado escasso; necrose superficial coagulativa.",
  ],
  evaluation: [
    "Reconhecer o artefato térmico evita interpretar o quadro como doença bolhosa.",
    "Porfiria e penfigoide devem ser lembrados se houver bolhas fora da área tratada.",
    "Confirmar que a atipia residual não representa carcinoma invasivo.",
  ],
  highlight: {
    title: "Artefato térmico",
    bullets: [
      <>Colágeno <Highlight>homogeneizado</Highlight> e núcleos alinhados denunciam a cauterização.</>,
      "A história do procedimento é indispensável para o laudo.",
    ],
    footer: "Bolhas fora do sítio tratado exigem investigação autoimune.",
  },
  pearl: <>bolha no sítio exato de um procedimento, com <Highlight>colágeno cozido</Highlight> e elastose ao redor, é iatrogenia — não doença bolhosa.</>,
};

const queimaduraAguda: FocusedNote = {
  title: "Queimadura aguda",
  concept: [
    <>Necrose por <Highlight>agressão térmica, química ou elétrica</Highlight>, com clivagem no nível atingido pelo calor.</>,
    "A profundidade da necrose define o grau e o prognóstico.",
  ],
  clinical: [
    "Eritema doloroso com bolhas tensas de aparecimento rápido, com limites correspondentes ao agente.",
    "Segundo grau superficial: bolha e dor intensa; profundo: hipoestesia e base pálida.",
    "História de exposição é evidente na maioria dos casos.",
  ],
  histology: [
    <><Highlight>Necrose coagulativa</Highlight> da epiderme com queratinócitos eosinofílicos e núcleos alongados, “em paliçada”.</>,
    "Bolha subepidérmica ou intraepidérmica conforme a profundidade; colágeno dérmico homogeneizado nas formas profundas.",
    "Inflamação escassa nas primeiras horas; neutrófilos aparecem depois.",
  ],
  evaluation: [
    <><Highlight>NET:</Highlight> necrose de espessura total sem alteração térmica do colágeno, com contexto medicamentoso.</>,
    "Dermatite fototóxica: necrose parcial, restrita à área fotoexposta.",
    "Queimadura química segue a distribuição do contato.",
  ],
  highlight: {
    title: "Núcleos alongados",
    bullets: [
      <>Queratinócitos e fibroblastos com núcleos <Highlight>estirados e paralelos</Highlight> = dano térmico.</>,
      "Colágeno homogeneizado indica queimadura profunda.",
    ],
    footer: "A profundidade da homogeneização estima o grau.",
  },
  pearl: <>o que separa queimadura de necrólise não é a necrose, e sim a <Highlight>alteração térmica do colágeno e dos núcleos</Highlight>.</>,
};

const blisterSuccao: FocusedNote = {
  title: "Bolha por sucção",
  concept: [
    <>Clivagem <Highlight>puramente mecânica</Highlight> na lâmina lúcida, por pressão negativa ou atrito.</>,
    "Usada como modelo experimental de bolha e vista em automanipulação e trauma.",
  ],
  clinical: [
    "Bolha tensa, monomorfa, de contorno regular e localização acessível às mãos.",
    "Conteúdo claro; cura sem cicatriz.",
    "Suspeitar de dermatite factícia quando o formato é geométrico e a história é inconsistente.",
  ],
  histology: [
    <>Bolha subepidérmica <Highlight>sem inflamação</Highlight>, com teto íntegro e assoalho liso.</>,
    "Papilas não festonadas e sem material hialino.",
    "Derme normal, sem fibrose nem elastose relevante.",
  ],
  evaluation: [
    <>Bolha limpa e sem inflamação exige <Highlight>IFD e porfirinas negativas</Highlight> antes do rótulo mecânico.</>,
    "Epidermólise bolhosa hereditária: início precoce e trauma mínimo.",
    "Dermatite factícia entra no diferencial quando há inconsistência clínica.",
  ],
  highlight: {
    title: "Diagnóstico de exclusão",
    bullets: [
      <>Bolha “limpa” obriga a excluir <Highlight>porfiria, EBA e penfigoide pobre em células</Highlight>.</>,
      "Assoalho liso, sem festonamento, afasta porfiria.",
    ],
    footer: "Contexto e formato da lesão valem mais que a lâmina.",
  },
  pearl: <>bolha subepidérmica <Highlight>sem uma única célula inflamatória</Highlight> é mecânica, porfírica ou hereditária — a lâmina sozinha não decide.</>,
};

const hipoxemiaPressao: FocusedNote = {
  title: "Bolha por hipoxemia e pressão (bolha do coma)",
  concept: [
    <>Necrose isquêmica por <Highlight>pressão prolongada</Highlight> somada a hipoperfusão, típica de pacientes em coma ou imobilizados.</>,
    "Classicamente associada a intoxicação por barbitúricos, opioides e monóxido de carbono.",
  ],
  clinical: [
    <>Bolhas tensas sobre <Highlight>proeminências ósseas</Highlight> e áreas de apoio, surgindo 24–72 h após o evento.</>,
    "Paciente com rebaixamento de consciência ou imobilidade prolongada.",
    "Cura em 1 a 2 semanas, podendo deixar cicatriz.",
  ],
  histology: [
    <>Bolha subepidérmica com <Highlight>necrose de queratinócitos</Highlight> e, caracteristicamente, <Highlight>necrose das glândulas écrinas</Highlight>.</>,
    "Trombos de fibrina em vasos dérmicos e infiltrado escasso.",
    "Necrose pode estender-se ao subcutâneo nas formas graves.",
  ],
  evaluation: [
    <>A <Highlight>necrose écrina</Highlight> é o achado que fecha o diagnóstico e não existe nas bolhas autoimunes.</>,
    "Queimadura e NET não têm o padrão de necrose glandular isolada.",
    "Correlacionar com o sítio de apoio e o tempo de imobilidade.",
  ],
  highlight: {
    title: "Necrose écrina",
    bullets: [
      <>Glândulas écrinas necróticas com <Highlight>núcleos picnóticos</Highlight> sob bolha pauci-inflamatória.</>,
      "Trombos dérmicos reforçam o componente isquêmico.",
    ],
    footer: "Achado que direciona à investigação toxicológica.",
  },
  pearl: <>bolha em proeminência óssea de paciente comatoso com <Highlight>necrose das glândulas écrinas</Highlight> é a bolha do coma — praticamente patognomônica.</>,
};

// ---------------------------------------------------------------------------
// Grupos morfológicos com mais de uma possibilidade
// ---------------------------------------------------------------------------

const eczemasPrecoces: FocusedNote = {
  title: "Eczemas em fase precoce",
  concept: [
    <>Grupo espongiótico: contato alérgico, numular, disidrótico e reação Id compartilham o mesmo <Highlight>padrão histológico</Highlight>.</>,
    "A vesícula nasce da coalescência do edema intercelular, não de acantólise.",
  ],
  clinical: [
    "Prurido é o sintoma dominante em todos.",
    <>A <Highlight>topografia</Highlight> orienta: contato segue a exposição, numular faz placas em moeda, disidrótico atinge mãos e pés.</>,
    "Reação Id aparece a distância de um foco inflamatório ou fúngico ativo.",
  ],
  histology: [
    <><Highlight>Espongiose</Highlight> com vesiculação intraepidérmica e exocitose de linfócitos.</>,
    "Infiltrado perivascular superficial com eosinófilos; paraceratose surge com a cronificação.",
    "Na fase precoce a córnea ainda é normal — pista de agudeza.",
  ],
  evaluation: [
    "A histologia não separa as entidades entre si — a clínica e a topografia decidem.",
    <>Fazer <Highlight>PAS</Highlight> em toda vesícula palmoplantar antes de assumir eczema.</>,
    "Penfigoide em fase pré-bolhosa pode ser espongiótico e rico em eosinófilos.",
  ],
  highlight: {
    title: "PAS e IFD",
    bullets: [
      <><Highlight>PAS</Highlight> obrigatório em vesícula de mãos e pés — dermatofitose é o grande simulador.</>,
      <>Muitos eosinófilos em idoso com prurido: peça <Highlight>IFD</Highlight> para excluir penfigoide.</>,
    ],
    footer: "Córnea normal indica lesão aguda; paraceratose, lesão já instalada.",
  },
  pearl: <>o padrão espongiótico é <Highlight>comum a todos os eczemas</Highlight>; o valor da biópsia está em excluir fungo e penfigoide, não em nomear o eczema.</>,
};

const eczemasComVesiculacao: FocusedNote = {
  title: "Eczemas com vesiculação intraepidérmica",
  concept: [
    <>Espongiose intensa o bastante para formar vesículas visíveis — contato alérgico, numular, dermatofitose e <Highlight>incontinentia pigmenti</Highlight>.</>,
    "O achado que muda a conduta é a presença de eosinófilos ou de fungo.",
  ],
  clinical: [
    "Placas eczematosas vesiculosas, muito pruriginosas.",
    <>Incontinentia pigmenti: recém-nascida com vesículas <Highlight>lineares, seguindo as linhas de Blaschko</Highlight>.</>,
    "Dermatofitose vesicular predomina nos pés, com borda descamativa.",
  ],
  histology: [
    <>Espongiose com vesículas contendo linfócitos e <Highlight>eosinófilos</Highlight>.</>,
    <>Incontinentia pigmenti: <Highlight>espongiose eosinofílica</Highlight> com queratinócitos disqueratóticos isolados — a combinação é característica.</>,
    "Dermatofitose: neutrófilos e hifas na camada córnea.",
  ],
  evaluation: [
    "Disqueratose no meio da espongiose eosinofílica, em neonato, é incontinentia pigmenti.",
    "PAS separa a dermatofitose dos eczemas verdadeiros.",
    "Penfigoide pré-bolhoso e picada de artrópode também fazem espongiose eosinofílica.",
  ],
  highlight: {
    title: "Espongiose eosinofílica",
    bullets: [
      <>Lista curta: <Highlight>penfigoide/pênfigo iniciais</Highlight>, incontinentia pigmenti, picada e contato alérgico.</>,
      "Disqueratose + linhas de Blaschko + neonato = incontinentia pigmenti.",
      "IFD resolve os casos de idoso com prurido.",
    ],
    footer: "PAS antes de assumir eczema em vesícula plantar.",
  },
  pearl: <>espongiose eosinofílica é um <Highlight>sinal de alerta</Highlight>, não um diagnóstico: pede IFD no idoso, linhas de Blaschko no neonato e PAS no pé.</>,
};

const eczemasFotoalergica: FocusedNote = {
  title: "Eczemas e dermatite fotoalérgica",
  concept: [
    <>Espongiose tão intensa que <Highlight>rompe a epiderme</Highlight>, formando vesícula ou bolha franca.</>,
    "Eczemas comuns e dermatite fotoalérgica compartilham integralmente o padrão.",
  ],
  clinical: [
    "Prurido intenso e lesões eczematosas agudas, exsudativas.",
    <>A <Highlight>fotodistribuição</Highlight> — com escape para áreas cobertas — é o que sugere fotoalergia.</>,
    "Reveja filtros solares, AINEs tópicos, fragrâncias e plantas.",
  ],
  histology: [
    "Espongiose confluente com vesículas coalescentes e ruptura da epiderme.",
    "Exocitose linfocitária e eosinófilos; crosta serosa no teto.",
    "Necrose de queratinócitos é escassa — diferencia da fototoxicidade.",
  ],
  evaluation: [
    "A distinção entre eczema comum e fotoalérgico é clínica, não histológica.",
    "Fototóxica: necrose de queratinócitos com pouca espongiose.",
    "Photopatch confirma o agente fotoalérgico.",
  ],
  highlight: {
    title: "Topografia",
    bullets: [
      <>Mesma lâmina, dois diagnósticos: quem decide é <Highlight>onde estão as lesões</Highlight>.</>,
      "Poupança de áreas de sombra sugere fotossensibilidade; extensão ampla, eczema comum.",
    ],
    footer: "Fototeste de contato para confirmar o agente.",
  },
  pearl: <>quando a espongiose rompe a epiderme, a lâmina se esgota como ferramenta: a <Highlight>topografia da erupção</Highlight> é que separa eczema de fotoalergia.</>,
};

const balonizacaoSuperior: FocusedNote = {
  title: "Balonização na epiderme superior — deficiências nutricionais e afins",
  concept: [
    <>Necrose da epiderme superior por <Highlight>depleção de nutrientes essenciais</Highlight> — zinco, biotina, niacina, aminoácidos.</>,
    <>Pelagra, eritema necrolítico migratório, acrodermatite enteropática e doença de Hartnup partilham a <Highlight>mesma histologia</Highlight>.</>,
  ],
  clinical: [
    <>Placas eritematosas erosadas e crostosas em áreas <Highlight>periorificiais, acrais e de atrito</Highlight>.</>,
    "Pelagra acomete áreas fotoexpostas (colar de Casal); eritema necrolítico migratório associa-se a glucagonoma.",
    "Diarreia, alopecia e irritabilidade acompanham a deficiência de zinco.",
  ],
  histology: [
    <><Highlight>Palidez e balonização do terço superior</Highlight> da epiderme, com necrose confluente e clivagem subcórnea.</>,
    "Paraceratose confluente e perda da camada granulosa.",
    "Infiltrado dérmico esparso, desproporcional ao dano epidérmico.",
  ],
  evaluation: [
    "As entidades são indistinguíveis entre si — laboratório e contexto decidem.",
    <>Dosar <Highlight>zinco, niacina, aminoácidos e glucagon</Highlight> conforme a suspeita.</>,
    "Psoríase pustulosa e pênfigo foliáceo entram no diferencial da clivagem alta.",
  ],
  highlight: {
    title: "Palidez do terço superior",
    bullets: [
      <>Epiderme superior <Highlight>pálida e balonizada</Highlight> com paraceratose é a assinatura do grupo.</>,
      "Ausência de acantólise verdadeira e de bactérias.",
    ],
    footer: "O diagnóstico específico é bioquímico, não histológico.",
  },
  pearl: <>palidez balonizada do terço superior da epiderme em placas periorificiais é <Highlight>deficiência nutricional</Highlight> até que os exames digam qual.</>,
};

const balonizacaoRuptura: FocusedNote = {
  title: "Intensa balonização com ruptura",
  concept: [
    <>Vesícula formada por <Highlight>edema intracelular</Highlight> que destrói o queratinócito, e não por acantólise ou espongiose.</>,
    "Reúne causas virais, tóxicas e de interface quando a lesão é muito exuberante.",
  ],
  clinical: [
    "Mão-pé-boca: criança, vesículas ovaladas acrais e enantema.",
    "Contato irritante: limites geométricos, ardor, história de exposição.",
    <>Eritema multiforme e PLEVA: lesões <Highlight>recorrentes</Highlight>, em alvo ou papulonecróticas.</>,
    "Erupção fixa por droga: placa que recidiva no mesmo local.",
  ],
  histology: [
    "Balonização e degeneração reticular com ruptura da epiderme e necrose confluente.",
    <>Procurar sistematicamente: <Highlight>efeito citopático</Highlight> (herpes), <Highlight>interface</Highlight> (EM, PLEVA, EPF) e <Highlight>melanófagos</Highlight> (EPF).</>,
    "Hemácias extravasadas na papila favorecem PLEVA.",
  ],
  evaluation: [
    "Sem os três “M”, o herpes sai da lista.",
    "Interface com melanófagos e eosinófilos = erupção fixa por droga.",
    "Interface em cunha com hemorragia e crosta neutrofílica = PLEVA.",
  ],
  highlight: {
    title: "Roteiro de leitura",
    bullets: [
      <>1) Há <Highlight>multinucleação</Highlight>? 2) Há <Highlight>interface</Highlight>? 3) Há <Highlight>melanófagos</Highlight>?</>,
      "As três perguntas resolvem a maioria dos casos deste nó.",
    ],
    footer: "A clínica (idade, recorrência, exposição) fecha o restante.",
  },
  pearl: <>quando a balonização é maciça, o diagnóstico volta a depender de <Highlight>três perguntas</Highlight>: efeito citopático, interface e melanófagos.</>,
};

const espongioseBalonizacaoRuptura: FocusedNote = {
  title: "Intensa espongiose e balonização com ruptura",
  concept: [
    <>Combinação de <Highlight>edema intercelular e intracelular</Highlight> que rompe a epiderme — padrão inespecífico por definição.</>,
    "Insulto por artrópode, eritema multiforme e erupção fixa por droga são as três hipóteses.",
  ],
  clinical: [
    "Artrópode: lesões agrupadas ou lineares, muito pruriginosas, em áreas expostas.",
    "Eritema multiforme: alvos acrais simétricos, recorrentes, pós-herpéticos.",
    <>Erupção fixa: placa que <Highlight>volta ao mesmo lugar</Highlight> após o fármaco.</>,
  ],
  histology: [
    <>Artrópode: infiltrado <Highlight>em cunha</Highlight>, superficial e profundo, com eosinófilos intersticiais.</>,
    "Eritema multiforme: interface vacuolar com necrose de queratinócitos em todos os níveis.",
    <>Erupção fixa: interface intensa com <Highlight>melanófagos</Highlight>, eosinófilos e neutrófilos.</>,
  ],
  evaluation: [
    "A profundidade do infiltrado é o melhor separador: cunha profunda = artrópode.",
    "Melanófagos densos = lesão recorrente = erupção fixa.",
    "Em bolha tensa de idoso, IFD antes de qualquer conclusão.",
  ],
  highlight: {
    title: "Profundidade e melanófagos",
    bullets: [
      <>Infiltrado <Highlight>profundo em cunha</Highlight> → artrópode.</>,
      <><Highlight>Melanófagos</Highlight> → erupção fixa por droga.</>,
      "Interface pura e superficial → eritema multiforme.",
    ],
    footer: "IFD sempre que houver bolha tensa em idoso.",
  },
  pearl: <>nesta encruzilhada, olhe <Highlight>a profundidade do infiltrado e os melanófagos</Highlight> — eles separam artrópode, eritema multiforme e erupção fixa.</>,
};

const espongioseEosinofilicaGrupo: FocusedNote = {
  title: "Espongiose eosinofílica sem vesiculação marcante",
  concept: [
    <>A <Highlight>espongiose eosinofílica</Highlight> pode ser a primeira lesão do penfigoide bolhoso, do herpes gestationis e do pênfigo vulgar, antes de qualquer bolha.</>,
    "É um padrão de alerta: a doença autoimune ainda não mostrou o nível da clivagem.",
  ],
  clinical: [
    <>Penfigoide em <Highlight>fase não bolhosa</Highlight>: idoso com prurido intenso e lesões eczematosas ou urticariformes.</>,
    "Herpes gestationis: gestante com placas urticadas periumbilicais.",
    "Pênfigo vulgar inicial: erosões orais dolorosas antes das lesões cutâneas.",
  ],
  histology: [
    <>Espongiose com <Highlight>eosinófilos dentro da epiderme</Highlight>, sem bolha franca.</>,
    "Infiltrado dérmico superficial rico em eosinófilos, por vezes com edema papilar.",
    "Procurar ativamente acantólise discreta e fendas incipientes na junção.",
  ],
  evaluation: [
    "A lista curta da espongiose eosinofílica inclui ainda picada de artrópode, contato alérgico e incontinentia pigmenti.",
    "A morfologia não define qual doença autoimune está começando.",
    "Repetir a biópsia em lesão mais desenvolvida se a IFD for inconclusiva.",
  ],
  highlight: {
    title: "IFD",
    bullets: [
      <>Espongiose eosinofílica em adulto <Highlight>obriga IFD de pele perilesional</Highlight>.</>,
      <><Highlight>Linear</Highlight> na junção = penfigoide/herpes gestationis; <Highlight>intercelular</Highlight> = pênfigo vulgar.</>,
      "ELISA (anti-BP180, anti-Dsg3) completa a caracterização.",
    ],
    footer: "É o achado que antecipa o diagnóstico em semanas ou meses.",
  },
  pearl: <>espongiose eosinofílica é a <Highlight>fase pré-bolhosa</Highlight> das doenças autoimunes: a IFD dá o diagnóstico antes de a bolha aparecer.</>,
};

// ---------------------------------------------------------------------------
// Mapa nó → nota
// ---------------------------------------------------------------------------

export const VESICOBULLOUS_NOTES: Record<string, FocusedNote> = {
  // Infecções
  "dx-vesico-herpesvirus": herpesvirus,
  "dx-vesico-acantolitica-herpesvirus": herpesvirus,
  "dx-vesico-varicela": varicela,
  "dx-vesico-mao-pe-boca": maoPeBoca,
  "dx-impetigo-bolhoso": impetigoBolhoso,
  "group-vesico-orf-ordenhadores": orfOrdenhadores,
  "dx-vesico-espongiose-dermatofitose": dermatofitoseVesicular,
  "dx-vesico-espongiose-neutrofilos-dermatofitose": dermatofitoseVesicular,

  // Contato, fotodermatoses e interface
  "dx-vesico-dermatite-contato-irritativa": contatoIrritativa,
  "dx-vesico-dermatite-fototoxica": fototoxica,
  "dx-vesico-dermatite-fotoalergica-precoce": fotoalergicaPrecoce,
  "dx-vesico-eritema-multiforme": eritemaMultiforme,
  "dx-vesico-espongiose-eritema-multiforme": eritemaMultiforme,
  "dx-subepi-linf-eritema-multiforme": eritemaMultiforme,
  "dx-eritema-multiforme-grave": eritemaMultiformeGrave,
  "dx-vesico-pleva": pleva,
  "dx-subepi-linf-pleva": pleva,
  "dx-vesico-eritema-pigmentar-fixo-precoce": eritemaPigmentarFixo,
  "dx-vesico-erupcao-fixa-droga": eritemaPigmentarFixo,
  "dx-vesico-insulto-artropode-simuladores": insultoArtropode,
  "dx-subepi-insulto-artropode-simuladores": insultoArtropode,
  "dx-dermatite-cantharidina": cantharidina,

  // Acantolíticas
  "dx-doenca-darier": darier,
  "dx-doenca-grover": grover,
  "dx-hailey-hailey": haileyHailey,
  "group-vesico-acantolitica-suprabasal-coesa": penfigoVulgar,
  "dx-penfigo-foliaceo": penfigoFoliaceo,
  "dx-penfigo-iga": penfigoIga,
  "dx-sindrome-pele-escaldada-estafilococica": sindromePeleEscaldada,
  "dx-penfigo-cicatricial": penfigoideMembranasMucosas,

  // Subepidérmicas imunomediadas
  "group-vesico-espongiose-eos-sem-vesicula": espongioseEosinofilicaGrupo,
  "group-subepi-neutrofilos-superior-eos": penfigoideEHerpesGestationis,
  "group-subepi-poucos-neutro-eos": penfigoidePobreEmCelulas,
  "dx-subepi-penfigoide-bolhoso": penfigoideBolhoso,
  "dx-subepi-herpes-gestacional": herpesGestacional,
  "dx-subepi-eba": epidermoliseBolhosaAdquirida,
  "dx-subepi-farmacodermia": farmacodermia,
  "group-subepi-misto-papilar-bolha": penfigoideEEba,
  "group-subepi-neutrofilos-bandas-sem-mucina": dermatiteHerpetiformeGrupo,
  "group-subepi-misto-bandas-sem-mucina": dermatiteHerpetiformeGrupo,
  "group-subepi-sem-infiltrado-eb": epidermoliseBolhosaGrupo,
  "group-subepi-porfirias": porfirias,
  "dx-lupus-eritematoso-sistemico-bolhoso": lupusBolhoso,

  // Subepidérmicas não imunomediadas e de vizinhança
  "dx-liquen-escleroso-atrofico-morfeia": liquenEscleroso,
  "dx-liquen-plano-bolhoso": liquenPlanoBolhoso,
  "dx-subepi-vasculite-leucocitoclastica": vasculiteLeucocitoclasticaBolhosa,
  "dx-subepi-vasculite-septica": vasculiteSeptica,
  "dx-subepi-pioderma-gangrenoso": piodermaGangrenoso,
  "dx-subepi-celulite": celuliteBolhosa,
  "dx-urticaria-pigmentosa": urticariaPigmentosa,
  "dx-amiloidose-bolhosa": amiloidoseBolhosa,
  "dx-bolha-sobre-cicatriz": bolhaSobreCicatriz,
  "dx-bolha-ceratose-actinica-eletrodissecada": bolhaEletrodissecacao,
  "dx-queimadura-aguda": queimaduraAguda,
  "dx-blister-por-succao": blisterSuccao,
  "dx-hipoxemia-plus-pressure": hipoxemiaPressao,

  // Grupos morfológicos
  "group-vesico-espongiose-eczemas-precoces": eczemasPrecoces,
  "group-vesico-espongiose-eos-com-vesicula": eczemasComVesiculacao,
  "group-eczemas-fotoalergica": eczemasFotoalergica,
  "group-vesico-balonizacao-superior": balonizacaoSuperior,
  "group-balonizacao-ruptura": balonizacaoRuptura,
  "group-espongiose-balonizacao-ruptura": espongioseBalonizacaoRuptura,
};
