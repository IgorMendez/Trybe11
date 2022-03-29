const steps = [
  {
    id: 'CLIENT_DATA',
    title: 'Dados do cliente',
    step: 'Solicitante',
  },
  {
    id: 'VEHICLES_FORM',
    title: 'Dados do veículo',
    step: 'Veículo',
  },
  {
    id: 'DATA_ADRESS',
    title: 'Dados de endereço',
    step: 'Agendamento',
  },
  {
    id: 'MORE_INFO',
    title: 'Dados sobre o motivo da solicitação',
    step: 'Pagamento',
  },
];

const steps2 = [
  {
    id: 'CLIENT_DATA',
    title: 'Dados do cliente',
    step: 'Solicitante',
  },
  {
    id: 'VEHICLES_FORM',
    title: 'Dados do veículo',
    step: 'Veículo',
  },
  {
    id: 'MORE_INFO',
    title: 'Dados sobre o motivo da solicitação',
    step: 'Pagamento',
  },
];

const pathsCoord = [
  { lat: -15.828665, lng: -48.14892 },
  { lat: -15.863872, lng: -48.122706 },
  { lat: -15.855038, lng: -48.107155 },
  { lat: -15.841146, lng: -48.097531 },
  { lat: -15.839547, lng: -48.078761 },
  { lat: -15.849623, lng: -48.076452 },
  { lat: -15.869029, lng: -48.104994 },
  { lat: -15.884846, lng: -48.153066 },
  { lat: -15.909935, lng: -48.145982 },
  { lat: -15.895997, lng: -48.100739 },
  { lat: -15.908244, lng: -48.09681 },
  { lat: -15.910953, lng: -48.104206 },
  { lat: -15.922147, lng: -48.108855 },
  { lat: -15.929991, lng: -48.11504 },
  { lat: -15.937318, lng: -48.105823 },
  { lat: -15.927166, lng: -48.096896 },
  { lat: -15.921278, lng: -48.096481 },
  { lat: -15.911081, lng: -48.082079 },
  { lat: -15.929711, lng: -48.05154 },
  { lat: -15.926701, lng: -48.041403 },
  { lat: -15.907326, lng: -48.047144 },
  { lat: -15.904854, lng: -48.037741 },
  { lat: -15.893669, lng: -48.043999 },
  { lat: -15.884973, lng: -48.052006 },
  { lat: -15.879213, lng: -48.047606 },
  { lat: -15.878056, lng: -48.034102 },
  { lat: -15.900807, lng: -48.021482 },
  { lat: -15.887623, lng: -47.991146 },
  { lat: -15.905965, lng: -47.986151 },
  { lat: -15.924112, lng: -47.98017 },
  { lat: -15.94283, lng: -47.992546 },
  { lat: -15.951365, lng: -47.978184 },
  { lat: -15.939411, lng: -47.941025 },
  { lat: -15.924077, lng: -47.948236 },
  { lat: -15.909094, lng: -47.924255 },
  { lat: -15.908328, lng: -47.912528 },
  { lat: -15.882101, lng: -47.903964 },
  { lat: -15.854882, lng: -47.890833 },
  { lat: -15.880373, lng: -47.871413 },
  { lat: -15.870844, lng: -47.850033 },
  { lat: -15.862191, lng: -47.830877 },
  { lat: -15.86275, lng: -47.82431 },
  { lat: -15.86805, lng: -47.826117 },
  { lat: -15.8765, lng: -47.814285 },
  { lat: -15.871908, lng: -47.809376 },
  { lat: -15.861165, lng: -47.807439 },
  { lat: -15.856663, lng: -47.81154 },
  { lat: -15.847082, lng: -47.808571 },
  { lat: -15.849644, lng: -47.805248 },
  { lat: -15.851378, lng: -47.801324 },
  { lat: -15.848441, lng: -47.796921 },
  { lat: -15.842367, lng: -47.792485 },
  { lat: -15.833623, lng: -47.803549 },
  { lat: -15.81424, lng: -47.79221 },
  { lat: -15.78023, lng: -47.823227 },
  { lat: -15.75068, lng: -47.825501 },
  { lat: -15.7292, lng: -47.854606 },
  { lat: -15.721924, lng: -47.848602 },
  { lat: -15.719373, lng: -47.854993 },
  { lat: -15.717208, lng: -47.861987 },
  { lat: -15.70685, lng: -47.866482 },
  { lat: -15.694526, lng: -47.867419 },
  { lat: -15.690523, lng: -47.869824 },
  { lat: -15.698103, lng: -47.883568 },
  { lat: -15.712419, lng: -47.900647 },
  { lat: -15.744185, lng: -47.920506 },
  { lat: -15.742311, lng: -47.923694 },
  { lat: -15.751248, lng: -47.928954 },
  { lat: -15.753439, lng: -47.930423 },
  { lat: -15.754585, lng: -47.93161 },
  { lat: -15.759966, lng: -47.950931 },
  { lat: -15.770111, lng: -47.954453 },
  { lat: -15.771563, lng: -47.950558 },
  { lat: -15.767302, lng: -47.949055 },
  { lat: -15.769229, lng: -47.940867 },
  { lat: -15.769887, lng: -47.939298 },
  { lat: -15.785866, lng: -47.944446 },
  { lat: -15.788079, lng: -47.948346 },
  { lat: -15.79051, lng: -47.952095 },
  { lat: -15.793224, lng: -47.957958 },
  { lat: -15.795035, lng: -47.964615 },
  { lat: -15.783488, lng: -47.975233 },
  { lat: -15.785219, lng: -47.977542 },
  { lat: -15.784803, lng: -47.979467 },
  { lat: -15.776854, lng: -47.987076 },
  { lat: -15.779101, lng: -47.988248 },
  { lat: -15.77854, lng: -47.9917 },
  { lat: -15.775864, lng: -47.995443 },
  { lat: -15.777372, lng: -47.997163 },
  { lat: -15.773889, lng: -48.000901 },
  { lat: -15.77006, lng: -48.001916 },
  { lat: -15.770474, lng: -48.004369 },
  { lat: -15.784403, lng: -48.002448 },
  { lat: -15.788597, lng: -48.026473 },
  { lat: -15.790496, lng: -48.051639 },
  { lat: -15.79902, lng: -48.08169 },
  { lat: -15.777428, lng: -48.136883 },
  { lat: -15.785118, lng: -48.167749 },
  { lat: -15.808902, lng: -48.16108 },
  { lat: -15.826234, lng: -48.162059 },
];

const ServiceTermText = `AVALIZ BRASIL LTDA.
        TERMO DE CIÊNCIA DO CONTRATANTE
        CONDIÇÕES GERAIS DOS SERVIÇOS
        A Vistoria Cautelar consiste em verificar vestígios aparentes ou não, de procedimentos de adulteração e checagem/cruzamento de informações proveniente de Base de Dados Públicas e Privadas, não substituindo em hipótese alguma a Perícia Oficial do Instituto de Criminalística (sem caráter pericial). As informações constantes no Laudo Cautelar emitido pela Avaliz, limitam-se a apresentar as informações que estão nas bases e sites consultados e identificar visualmente as condições em que o veículo se encontra, analisando a identificação, estrutura, pintura, funilaria do veículo com a indicação das avarias apresentadas. A sua validade restringe-se ao exato momento da realização dos exames, eximindo a Avaliz, de responsabilidade por quaisquer modificações, alterações e/ou substituições realizadas no veículo, seus sinais indicativos, estrutura e agregados, posteriores a data e hora de coleta das informações, tão pouco pelos dados obtidos nas consultas fornecidas por órgãos públicos e/ou terceiros. A Avaliz utiliza em seus processos de vistoria, consultas na Base de Dados Públicas e Privadas e sua responsabilidade limita-se a prestar informações sobre veículos automotores registrados neste bases detentoras das informações, não sendo responsável pelas informações inseridas na sua base de dados, pois estas são oriundas de consulta à Bases Públicas e Privadas sobre as quais não detém a propriedade das informações, limitando-se assim, a reproduzi-las fielmente, na forma como originariamente apresentadas em tais bases consultadas. Da mesma forma não se responsabiliza por informações incorretas, faltantes, ou divergentes de bases públicas e outra que não detenha as informações. Cabe ao contratante, consultar o órgão competente para os casos de restrições, multas ou divergências nas informações, antes de concluir a negociação do veículo. A Avaliz não detém acesso e meios para a obtenção advinda do RENAJUD.

    

        ATENÇÃO: Em decorrência de possíveis falhas momentâneas de atualização entre a Base Estadual e Federal, sugerimos que seja realizada a comparação das informações restritivas informadas, com as do DETRAN Estadual. As companhias de seguro, financeiras e outras de maneira geral, possuem seus próprios métodos e critérios de avaliação do risco para aceitação ou não na realização dos negócios.

    

        DECLARAÇÃO
        Eu, Contratante do serviço e/ou Proprietário do veículo, declaro ter lido e compreendido todas as informações presentes neste documento, especialmente tendo a ciência que a Vistoria Cautelar prestada pela Avaliz tem o objetivo exclusivo de colaborar com o processo de averiguação de procedência do veículo, ou seja, apenas como análise prévia, cabendo inteiramente a mim a análise das informações contida no Laudo Cautelar e decisão sobre o negócio. Entendo assim, que qualquer informação constante no Laudo Cautelar emitido pela Avaliz, trata-se de uma opinião e não de um Parecer Técnico. Declaro estar ciente que esta pesquisa tem caráter sigiloso e informativo, que não é válida como certidão e documento com valor judicial e que as informações acima descritas são de uso exclusivo do destinatário e sua utilização por outra pessoa, ou para finalidade diversa da contratada, pode caracterizar ilícito civil. Tendo a ciência de que o levantamento das informações veiculares via consultas na Base de Dados Públicas e Privadas jamais pode substituir a consulta do órgão oficial de trânsito, compreendendo ainda que a Vistoria Cautelar, por mais esforços que faça para conseguir as informações contratadas a respeito do veículo, está isenta por mim de toda e qualquer responsabilidade a respeito dos resultados revelados, haja vista que utiliza-se de informações oriundas de meios eletrônicos, de empresas privadas, de órgãos ou entidades que declaram que o extrato, a certidão ou a consulta não valem como negativa de débito ou certidão de regularidade. Autorizo a utilização de dados contidos no Laudo Cautelar para fins de redução de riscos em processos que envolvam veículos e a utilização das informações para fins estatísticos e de vistoria. Ao clicar no “Eu aceito” ou assinar abaixo, reconheço expressamente ter lido e compreendido as condições do serviço de Vistoria Cautelar prestado pela Avaliz.`;

const fipeComparationPrices = {
  price1: 50000,
  price2: 100000,
  price3: 150000,
  price4: 200000,
  price5: 250000,
};

const rulesPrices = {
  acp: {
    prices: {
      price1: 249.9,
      price2: 299.9,
      price3: 349.9,
      price4: 399.9,
      price5: 499.9,
    },
    yearRules: {
      // Menor que one.year é x 0
      one: { year: 5, calc: 1.20 },
      two: { year: 10, calc: 1.20 },
      three: { year: 15, calc: 1.70 },
      four: { year: 20, calc: 2 },
    },
  },
  ame: {
    prices: {
      price1: 349,
      price2: 399,
      price3: 449,
      price4: 549,
      price5: 599,
    },
    yearRules: {
      // Menor que one.year é x 0
      one: { year: 5, calc: 1.20 },
      two: { year: 10, calc: 1.20 },
      three: { year: 15, calc: 1.70 },
      four: { year: 20, calc: 2 },
    },
  },
  iah: {
    prices: {
      price1: 349,
      price2: 399,
      price3: 449,
      price4: 549,
      price5: 599,
    },
    yearRules: {
      // Menor que one.year é x 0
      one: { year: 5, calc: 1.20 },
      two: { year: 10, calc: 1.20 },
      three: { year: 15, calc: 1.70 },
      four: { year: 20, calc: 2 },
    },
  },
  acc: {
    prices: {
      price1: 599,
      price2: 649,
      price3: 699,
      price4: 799,
      price5: 899,
    },
    yearRules: {
      // Menor que one.year é x 0
      one: { year: 5, calc: 1.20 },
      two: { year: 10, calc: 1.20 },
      three: { year: 15, calc: 1.70 },
      four: { year: 20, calc: 2 },
    },
  },
  ap: {
    prices: {
      price1: 799,
      price2: 849,
      price3: 899,
      price4: 999,
      price5: 1099,
    },
    yearRules: {
      // Menor que one.year é x 0
      one: { year: 5, calc: 1.20 },
      two: { year: 10, calc: 1.20 },
      three: { year: 15, calc: 1.70 },
      four: { year: 20, calc: 2 },
    },
  },
};

module.exports = {
  pathsCoord,
  steps,
  steps2,
  ServiceTermText,
  fipeComparationPrices,
  rulesPrices,
};
