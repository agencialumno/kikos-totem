const produtos = [
  // Esteiras
  {
    id: 1,
    nome: "Esteira Ergométrica Kikos E900 2.0 HP 10 Km/h",
    categoria: "Esteiras",
    desconto: 45,
    parcelas: "21x de R$ 222,29",
    precoOriginal: 6790.00,
    precoVista: 3734.40,
    foto: "assets/images/produtos/e1.jpg"
  },
  {
    id: 2,
    nome: "Esteira Ergométrica Kikos E1200c 2.5 HP 14 Km/h",
    categoria: "Esteiras",
    desconto: 45,
    parcelas: "21x de R$ 349,95",
    precoOriginal: 10690.00,
    precoVista: 5879.20,
    foto: "assets/images/produtos/e2.jpg"
  },

  // Bikes
  {
    id: 3,
    nome: "Bicicleta Air Bike Kikos A5",
    categoria: "Bikes",
    desconto: 25,
    parcelas: "21x de R$ 137,95",
    precoOriginal: 3090.00,
    precoVista: 2317.60,
    foto: "assets/images/produtos/b1.jpg"
  },
  {
    id: 4,
    nome: "Bicicleta Ergométrica Spinning Kikos MAX-KS2",
    categoria: "Bikes",
    desconto: 35,
    parcelas: "21x de R$ 146,62",
    precoOriginal: 3790.00,
    precoVista: 2463.20,
    foto: "assets/images/produtos/b2.jpg"
  },

  // Elípticos
  {
    id: 5,
    nome: "Elíptico Kikos 2.0 Magnético",
    categoria: "Elípticos",
    desconto: 50,
    parcelas: "21x de R$ 118,43",
    precoOriginal: 3990.00,
    precoVista: 1989.60,
    foto: "assets/images/produtos/eli1.jpg"
  },
  {
    id: 6,
    nome: "Elíptico Kikos 8704 Magnético",
    categoria: "Elípticos",
    desconto: 40,
    parcelas: "21x de R$ 281,81",
    precoOriginal: 7890.00,
    precoVista: 4734.40,
    foto: "assets/images/produtos/eli2.jpg"
  },

  // Escadas
  {
    id: 7,
    nome: "Escada Com Display KE14.0",
    categoria: "Escadas",
    desconto: 38,
    parcelas: "21x de R$ 1.125,24",
    precoOriginal: 30490.00,
    precoVista: 18904.00,
    foto: "assets/images/produtos/escada1.jpg"
  },
  {
    id: 8,
    nome: "Simulador de Escada Kikos Profissional KE17.0i",
    categoria: "Escadas",
    desconto: 25,
    parcelas: "21x de R$ 2.227,67",
    precoOriginal: 49900.00,
    precoVista: 37424.80,
    foto: "assets/images/produtos/escada2.jpg"
  },

  // Multifuncionais
  {
    id: 9,
    nome: "Estação De Musculação Kikos Gx Supreme Torre 45kg",
    categoria: "Multifuncionais",
    desconto: 48,
    parcelas: "21x de R$ 191,62",
    precoOriginal: 6190.00,
    precoVista: 3219.20,
    foto: "assets/images/produtos/multi1.jpg"
  },
  {
    id: 10,
    nome: "Estação De Musculação Kikos Gx1 Torre 57kg",
    categoria: "Multifuncionais",
    desconto: 48,
    parcelas: "21x de R$ 309,24",
    precoOriginal: 9990.00,
    precoVista: 5195.20,
    foto: "assets/images/produtos/multi2.jpg"
  },

  // Musculação
  {
    id: 11,
    nome: "Cadeira Extensora Kikos Pro Titanium TTS71",
    categoria: "Musculação",
    desconto: 20,
    parcelas: "21x de R$ 1.056,67",
    precoOriginal: 22190.00,
    precoVista: 17752.00,
    foto: "assets/images/produtos/musc1.jpg"
  },
  {
    id: 12,
    nome: "Graviton Kikos Pro Titanium 88Kg TTS60",
    categoria: "Musculação",
    desconto: 20,
    parcelas: "21x de R$ 1.056,67",
    precoOriginal: 22190.00,
    precoVista: 17752.00,
    foto: "assets/images/produtos/musc2.jpg"
  },

  // Plataformas e Remos
  {
    id: 13,
    nome: "Plataforma Vibratória Kikos P201lx",
    categoria: "Plataformas e Remos",
    desconto: 28,
    parcelas: "21x de R$ 269,57",
    precoOriginal: 6290.00,
    precoVista: 4528.80,
    foto: "assets/images/produtos/plat1.jpg"
  },
  {
    id: 14,
    nome: "Remo Kikos 218CA 12 Níveis de Tensão",
    categoria: "Plataformas e Remos",
    desconto: 35,
    parcelas: "21x de R$ 301,38",
    precoOriginal: 7790.00,
    precoVista: 5063.20,
    foto: "assets/images/produtos/plat2.jpg"
  },

  // Bancos
  {
    id: 15,
    nome: "Banco Multi Posições Kikos A85 com Puxadores",
    categoria: "Bancos",
    desconto: 35,
    parcelas: "13x de R$ 103,15",
    precoOriginal: 1650.00,
    precoVista: 1072.80,
    foto: "assets/images/produtos/banco1.jpg"
  },
  {
    id: 16,
    nome: "Banco Supino Regular Fechado 0 A 45 - Smart Repair Showroom",
    categoria: "Bancos",
    desconto: 50,
    parcelas: "21x de R$ 347,62",
    precoOriginal: 11718.00,
    precoVista: 5840.00,
    foto: "assets/images/produtos/banco2.jpg"
  },

  // Pesos Livres
  {
    id: 17,
    nome: "Anilha Rubber Vermelho Kikos Pro",
    categoria: "Pesos Livres",
    desconto: 20,
    parcelas: "2x de R$ 104,50",
    precoOriginal: 209.00,
    precoVista: 167.20,
    foto: "assets/images/produtos/ps1.jpg"
  },
  {
    id: 18,
    nome: "Dumbbell Rubber Vermelho Kikos Pro",
    categoria: "Pesos Livres",
    desconto: 20,
    parcelas: "9x de R$ 102,11",
    precoOriginal: 919.00,
    precoVista: 735.20,
    foto: "assets/images/produtos/ps2.jpg"
  },

  // Acessórios
  {
    id: 19,
    nome: "Corda De Pular Kikos Light",
    categoria: "Acessórios",
    desconto: 71,
    parcelas: "1x de R$ 9,00",
    precoOriginal: 25.00,
    precoVista: 7.20,
    foto: "assets/images/produtos/ac1.jpg"
  },
  {
    id: 20,
    nome: "Colchonete Emborrachado Kikos Grande",
    categoria: "Acessórios",
    desconto: 20,
    parcelas: "5x de R$ 109,00",
    precoOriginal: 545.00,
    precoVista: 436.00,
    foto: "assets/images/produtos/ac2.jpg"
  }
];