export type Lang = 'pt' | 'en'

export type Content = {
  role: string
  available: string
  hero: { lines: string[]; sub: string }
  about: { label: string; paragraphs: string[]; facts: { k: string; v: string }[] }
  work: { label: string; items: { name: string; desc: string; tags: string }[]; soon: string }
  how: { label: string; rows: { k: string; note?: string; tech: { name: string; icon?: string }[] }[] }
  path: { label: string; lead: string; now: string; legend: { work: string; edu: string; side: string }; rows: { year: string; period: string; what: string; where: string; note?: string; tag?: string; kind?: 'edu' | 'now' | 'side' }[] }
  contact: { label: string; lead: string }
}

export const content: Record<Lang, Content> = {
  pt: {
    role: 'Desenvolvedor full stack',
    available: 'Goiânia, Brasil',
    hero: {
      lines: ['Construo sistemas web', 'de ponta a ponta', 'e coloco no ar.'],
      sub: 'Full stack júnior na Orius e estudante de Engenharia de Software. Gosto de código enxuto, seguro e que dá pouco trabalho para manter.',
    },
    about: {
      label: 'Sobre',
      paragraphs: [
        'Sou desenvolvedor full stack júnior em Goiânia. Comecei no atendimento e no suporte, passei por IFTEC, Softwiki e Orius, e hoje desenvolvo na Orius com React, TypeScript, Python e FastAPI.',
        'Além do trabalho, construo sistemas próprios, de um sistema de pedidos para restaurante a um SaaS para clínicas, e coloco tudo no ar na minha VPS. Prefiro Node.js no back-end e busco soluções enxutas, seguras e escaláveis, com OWASP, ISO/IEC 27001 e cache em Redis desde o início do projeto.',
      ],
      facts: [
        { k: 'Atuação', v: 'Desenvolvedor full stack júnior, Orius Tecnologia' },
        { k: 'Formação', v: 'Engenharia de Software, UNIFAN (7º período)' },
        { k: 'Idiomas', v: 'Português e inglês avançado' },
        { k: 'Base', v: 'Goiânia, GO' },
      ],
    },
    work: {
      label: 'Trabalhos',
      soon: 'prints em breve',
      items: [
        { name: 'Clivra', desc: 'SaaS para clínicas odontológicas.', tags: 'SaaS · em finalização' },
        { name: 'Opus', desc: 'Sistema para uma empresa de eventos presenciais de Uberlândia.', tags: 'Cliente real · Solo' },
        { name: 'GS Sabores', desc: 'Sistema de pedidos para um restaurante de Goiânia: pedidos, produtos, categorias e aviso ao cliente por WhatsApp.', tags: 'Cliente real · WhatsApp' },
        { name: 'Weave', desc: 'Motor de relatórios para web com editor visual: modelos prontos, componentes simples e resultado em tempo real. Você descreve em JSON, ele gera o PDF.', tags: 'Editor visual · JSON → PDF' },
        { name: 'Automação de barbearia', desc: 'Agente de IA no n8n que agenda horários: entende texto, áudio e imagem, consulta a disponibilidade e cria e remove agendamentos.', tags: 'n8n · IA' },
      ],
    },
    how: {
      label: 'Como eu trabalho',
      rows: [
        { k: 'Front-end', tech: [{ name: 'React', icon: 'react' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'TanStack Query', icon: 'tanstack' }, { name: 'Tailwind', icon: 'tailwind' }] },
        { k: 'Back-end', note: 'Node.js é minha escolha nos projetos pessoais; na Orius uso Python.', tech: [{ name: 'Node.js', icon: 'nodejs' }, { name: 'Express', icon: 'express' }, { name: 'NestJS', icon: 'nestjs' }, { name: 'Python', icon: 'python' }, { name: 'FastAPI', icon: 'fastapi' }] },
        { k: 'Dados', tech: [{ name: 'PostgreSQL', icon: 'postgresql' }, { name: 'MySQL', icon: 'mysql' }, { name: 'Redis', icon: 'redis' }] },
        { k: 'Deploy', note: 'Tudo na minha própria VPS (Contabo), gerenciada com Easypanel.', tech: [{ name: 'Docker', icon: 'docker' }, { name: 'Git', icon: 'git' }] },
        { k: 'Automação', tech: [{ name: 'n8n', icon: 'n8n' }] },
        { k: 'Segurança', note: 'Desde o começo do projeto.', tech: [{ name: 'OWASP', icon: 'owasp' }, { name: 'ISO/IEC 27001' }] },
      ],
    },
    path: {
      label: 'Trajetória',
      lead: 'Comecei no suporte e fui para o código.',
      now: 'agora',
      legend: { work: 'trabalho', edu: 'formação', side: 'projeto paralelo' },
      rows: [
        { year: '2023', period: 'jan/2023 – jun/2024', what: 'Analista de sistema', where: 'IFTEC Certificadora', note: 'Atendimento ao cliente e emissão de certificado digital.' },
        { year: '2023', period: '2023 – 2026', what: 'Engenharia de Software', where: 'UNIFAN', note: 'Bacharelado, hoje no 7º período.', kind: 'edu' },
        { year: '2023', period: 'início da faculdade', what: 'Primeiras landing pages', where: 'HTML, CSS e JavaScript', note: 'Aprendi a base da web e fiz duas landing pages.', tag: 'estudo', kind: 'side' },
        { year: '2024', period: 'ago/2024 – ago/2025', what: 'Analista de sistema', where: 'Softwiki Tecnologia', note: 'Helpdesk do sistema de cartório, com suporte remoto via AnyDesk.' },
        { year: '2025', period: 'abr/2025', what: 'GS Sabores', where: 'Restaurante em Goiânia', note: 'Meu primeiro sistema: pedidos, produtos, categorias e aviso ao cliente por WhatsApp.', tag: 'fora do expediente', kind: 'side' },
        { year: '2025', period: 'ago/2025 – atual', what: 'Analista de suporte técnico', where: 'Orius Tecnologia', note: 'Entrada na empresa onde hoje desenvolvo.' },
        { year: '2025', period: 'out/2025', what: 'Opus', where: 'Marketing e promoção de eventos, Uberlândia/MG', note: 'Sistema dedicado para a empresa, feito em paralelo ao trabalho.', tag: 'fora do expediente', kind: 'side' },
        { year: '2026', period: 'abr/2026 – atual', what: 'Desenvolvedor full stack júnior', where: 'Orius Tecnologia', note: 'React e TypeScript no front, Python e FastAPI no back.', kind: 'now' },
        { year: '2026', period: '2026', what: 'Weave', where: 'Motor de relatórios para web', note: 'Relatórios descritos em JSON, inspirado no FastReport e no Figma, gerando PDF.', tag: 'projeto pessoal', kind: 'side' },
        { year: '2026', period: '2026 – em finalização', what: 'Clivra', where: 'SaaS para clínicas odontológicas', note: 'Meu maior projeto até agora, na reta final de desenvolvimento.', tag: 'em finalização', kind: 'side' },
      ],
    },
    contact: {
      label: 'Contato',
      lead: 'Tem um projeto ou uma vaga? Fale comigo.',
    },
  },
  en: {
    role: 'Full stack developer',
    available: 'Goiânia, Brazil',
    hero: {
      lines: ['I build web systems', 'end to end', 'and ship them.'],
      sub: "Junior full stack at Orius and a Software Engineering student. I like lean, secure code that's cheap to maintain.",
    },
    about: {
      label: 'About',
      paragraphs: [
        "I'm a junior full stack developer based in Goiânia. I started in customer service and support, went through IFTEC, Softwiki and Orius, and today I build software at Orius with React, TypeScript, Python and FastAPI.",
        'Outside of work I build my own systems, from an ordering system for a restaurant to a SaaS for clinics, and I ship everything on my own VPS. I prefer Node.js on the back end and aim for lean, secure and scalable solutions, with OWASP, ISO/IEC 27001 and Redis caching from the start of each project.',
      ],
      facts: [
        { k: 'Role', v: 'Junior full stack developer, Orius Tecnologia' },
        { k: 'Education', v: 'Software Engineering, UNIFAN (7th semester)' },
        { k: 'Languages', v: 'Portuguese and advanced English' },
        { k: 'Based in', v: 'Goiânia, Brazil' },
      ],
    },
    work: {
      label: 'Work',
      soon: 'screenshots soon',
      items: [
        { name: 'Clivra', desc: 'SaaS for dental clinics.', tags: 'SaaS · wrapping up' },
        { name: 'Opus', desc: 'System for an in-person events company in Uberlândia.', tags: 'Real client · Solo' },
        { name: 'GS Sabores', desc: 'Order system for a restaurant in Goiânia: orders, products, categories and WhatsApp notifications to customers.', tags: 'Real client · WhatsApp' },
        { name: 'Weave', desc: 'Web report engine with a visual editor: ready-made templates, simple components and real-time preview. You describe it in JSON, it renders the PDF.', tags: 'Visual editor · JSON → PDF' },
        { name: 'Barbershop automation', desc: 'AI agent on n8n that books appointments: understands text, audio and images, checks availability, and creates and removes bookings.', tags: 'n8n · AI' },
      ],
    },
    how: {
      label: 'How I work',
      rows: [
        { k: 'Front end', tech: [{ name: 'React', icon: 'react' }, { name: 'TypeScript', icon: 'typescript' }, { name: 'TanStack Query', icon: 'tanstack' }, { name: 'Tailwind', icon: 'tailwind' }] },
        { k: 'Back end', note: 'Node.js is my pick for personal projects; at Orius I use Python.', tech: [{ name: 'Node.js', icon: 'nodejs' }, { name: 'Express', icon: 'express' }, { name: 'NestJS', icon: 'nestjs' }, { name: 'Python', icon: 'python' }, { name: 'FastAPI', icon: 'fastapi' }] },
        { k: 'Data', tech: [{ name: 'PostgreSQL', icon: 'postgresql' }, { name: 'MySQL', icon: 'mysql' }, { name: 'Redis', icon: 'redis' }] },
        { k: 'Deploy', note: 'Everything runs on my own VPS (Contabo), managed with Easypanel.', tech: [{ name: 'Docker', icon: 'docker' }, { name: 'Git', icon: 'git' }] },
        { k: 'Automation', tech: [{ name: 'n8n', icon: 'n8n' }] },
        { k: 'Security', note: 'From day one.', tech: [{ name: 'OWASP', icon: 'owasp' }, { name: 'ISO/IEC 27001' }] },
      ],
    },
    path: {
      label: 'Path',
      lead: 'I started in support and moved into code.',
      now: 'now',
      legend: { work: 'job', edu: 'education', side: 'side project' },
      rows: [
        { year: '2023', period: 'Jan/2023 – Jun/2024', what: 'Systems analyst', where: 'IFTEC Certificadora', note: 'Customer service and digital certificate issuing.' },
        { year: '2023', period: '2023 – 2026', what: 'Software Engineering', where: 'UNIFAN', note: "Bachelor's degree, now in the 7th semester.", kind: 'edu' },
        { year: '2023', period: 'start of college', what: 'First landing pages', where: 'HTML, CSS and JavaScript', note: 'Learned the web basics and built two landing pages.', tag: 'learning', kind: 'side' },
        { year: '2024', period: 'Aug/2024 – Aug/2025', what: 'Systems analyst', where: 'Softwiki Tecnologia', note: 'Helpdesk for a notary-office system, with remote support over AnyDesk.' },
        { year: '2025', period: 'Apr/2025', what: 'GS Sabores', where: 'Restaurant in Goiânia', note: 'My first system: orders, products, categories and WhatsApp notifications to customers.', tag: 'after hours', kind: 'side' },
        { year: '2025', period: 'Aug/2025 – present', what: 'Technical support analyst', where: 'Orius Tecnologia', note: 'How I joined the company where I now build software.' },
        { year: '2025', period: 'Oct/2025', what: 'Opus', where: 'Event marketing and promotion, Uberlândia/MG', note: 'A dedicated system for the company, built alongside my job.', tag: 'after hours', kind: 'side' },
        { year: '2026', period: 'Apr/2026 – present', what: 'Junior full stack developer', where: 'Orius Tecnologia', note: 'React and TypeScript on the front, Python and FastAPI on the back.', kind: 'now' },
        { year: '2026', period: '2026', what: 'Weave', where: 'Web report engine', note: 'Reports described in JSON, inspired by FastReport and Figma, rendering to PDF.', tag: 'personal project', kind: 'side' },
        { year: '2026', period: '2026 – wrapping up', what: 'Clivra', where: 'SaaS for dental clinics', note: 'My biggest project so far, in its final stretch of development.', tag: 'wrapping up', kind: 'side' },
      ],
    },
    contact: {
      label: 'Contact',
      lead: 'Got a project or a role? Get in touch.',
    },
  },
}

export const EMAIL = 'souzaioshua2234@gmail.com'
export const LINKEDIN = 'https://linkedin.com/in/ioshua-souza/'
export const WHATSAPP = { number: '5562984883324', display: '(62) 98488-3324' }
