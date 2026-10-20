export type Lang = 'pt' | 'en'

export type Tech = { name: string; icon?: string }
export type ProjectDetail = {
  summary: string
  status?: string
  context?: string
  features: string[]
  stack: Tech[]
  notes?: string[]
}
export type WorkItem = { name: string; desc: string; tags: string; detail: ProjectDetail }
export type WorkLabels = { open: string; close: string; status: string; context: string; features: string; stack: string; notes: string }

export type Content = {
  role: string
  available: string
  hero: { lines: string[]; sub: string }
  about: { label: string; paragraphs: string[]; facts: { k: string; v: string }[] }
  work: { label: string; items: WorkItem[]; soon: string; labels: WorkLabels }
  how: { label: string; rows: { k: string; note?: string; tech: { name: string; icon?: string }[] }[] }
  path: { label: string; lead: string; now: string; legend: { work: string; edu: string; side: string }; rows: { year: string; period: string; what: string; where: string; note?: string; tag?: string; kind?: 'edu' | 'now' | 'side' }[] }
  contact: { label: string; lead: string; project: string; role: string; resume: string; github: string }
}

export const content: Record<Lang, Content> = {
  pt: {
    role: 'Desenvolvedor full stack',
    available: 'Goiânia, Brasil',
    hero: {
      lines: ['Construo sistemas web', 'de ponta a ponta', 'e coloco no ar.'],
      sub: 'Full stack júnior na Orius, onde recrio sistemas cartorários para a web. Transformo necessidades reais em aplicações, integrações e automações, do desenho à implantação.',
    },
    about: {
      label: 'Sobre',
      paragraphs: [
        'Sou desenvolvedor full stack em Goiânia e trabalho na construção de sistemas web para cartórios na Orius Tecnologia. Minha trajetória começou no suporte técnico, onde aprendi a lidar com problemas reais, entender as necessidades dos usuários e investigar o que acontece por trás de um sistema.',
        'Hoje, levo essa visão para o desenvolvimento: construo interfaces, APIs, integrações e automações, acompanhando o processo até a aplicação estar pronta para funcionar no ambiente real.',
        'Além do trabalho, desenvolvo projetos próprios como o Weave e o Clivra, explorando desafios que vão de ferramentas de relatórios a produtos SaaS. Gosto de entender o problema antes de escolher a tecnologia e valorizo soluções claras, seguras e que possam evoluir sem se tornar difíceis de manter.',
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
      labels: { open: 'Ver detalhes', close: 'Fechar', status: 'Estágio', context: 'Contexto', features: 'O que o sistema faz', stack: 'Tecnologias', notes: 'Observações' },
      items: [
        {
          name: 'Clivra',
          desc: 'SaaS para clínicas odontológicas.',
          tags: 'SaaS · em teste',
          detail: {
            summary: 'SaaS que centraliza as necessidades de uma clínica odontológica em um único sistema.',
            status: 'Em fase de teste com um usuário durante 1 mês, captando feedback e adaptando o produto.',
            features: [
            'Agendamentos e atendimentos detalhados',
            'Gestão de clientes e anamnese',
            'Orçamentos e boletos, com envio por e-mail e WhatsApp',
            'Painel próprio para o cliente se agendar nos horários da clínica',
            'Gestão financeira',
            'Relatórios completos de produção, desempenho e financeiro',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Prisma' },
            { name: 'PostgreSQL', icon: 'postgresql' },
            { name: 'Redis', icon: 'redis' },
            { name: 'BullMQ (workers)' },
            { name: 'Amazon S3' },
            { name: 'Resend' },
          ],
          },
        },
        {
          name: 'Oppus',
          desc: 'Sistema para uma empresa de eventos presenciais de Uberlândia.',
          tags: 'Cliente real · Solo',
          detail: {
            summary: 'Sistema dedicado para uma empresa de eventos presenciais de Uberlândia, no lugar de um sistema genérico que não atendia a operação.',
            context: 'Fui contratado pela Iaxion Automação, que conheci por networking. O projeto tinha sido iniciado por outro desenvolvedor, que desistiu no meio. Assumi tudo e concluí o desenvolvimento em pouco mais de 3 meses.',
            features: [
            'Gestão de clientes, promotoras, fornecedores, eventos e uniformes',
            'Gestão financeira',
            'Alocação de promotoras nos eventos, com diárias a cumprir e acompanhamento',
            'Painel web da promotora para bater ponto com localização, enviar fotos do evento e registrar gastos e repasses',
            'Avisos da equipe por WhatsApp sobre anomalias, como promotora que não bateu ponto ou conta a pagar',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Sequelize' },
            { name: 'Zod' },
            { name: 'PostgreSQL', icon: 'postgresql' },
            { name: 'Amazon S3' },
          ],
            notes: [
            'Na época eu ainda não dominava cache.',
            'Não acompanho o estado atual do sistema.',
          ],
          },
        },
        {
          name: 'GS Sabores',
          desc: 'Sistema de pedidos para um restaurante de Goiânia: pedidos, produtos, categorias e aviso ao cliente por WhatsApp.',
          tags: 'Cliente real · WhatsApp',
          detail: {
            summary: 'Meu primeiro sistema: gerenciamento de pedidos para um restaurante de Goiânia.',
            features: [
            'Pedidos',
            'Produtos e categorias',
            'Aviso ao cliente por WhatsApp',
          ],
            stack: [
          ],
          },
        },
        {
          name: 'Weave',
          desc: 'Motor de relatórios para web com editor visual: modelos prontos, componentes simples e resultado em tempo real. Você descreve em JSON, ele gera o PDF.',
          tags: 'Editor visual · JSON → PDF',
          detail: {
            summary: 'Motor de relatórios customizável para a web, com visual simples, moderno e pensado para o usuário final.',
            context: 'A ideia vem do FastReport, que permite montar relatórios do jeito que quiser. Na refatoração do sistema da Orius, o legado usava o FastReport e era preciso recriar essa capacidade na web. Fiz fora do expediente, e a Orius o usa como testadora no novo sistema.',
            features: [
            'Relatórios descritos em JSON, com geração de PDF',
            'Editor visual com modelos prontos e componentes simples',
            'Resultado em tempo real',
            'Assistente de IA (gpt-6-luna) para ajudar nas alterações',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'n8n', icon: 'n8n' },
            { name: 'Redis', icon: 'redis' },
          ],
            notes: [
            'O back-end em Node não era estritamente necessário, já que o front poderia falar direto com o n8n. Mantive por causa dos padrões de código.',
          ],
          },
        },
        {
          name: 'Automação de barbearia',
          desc: 'Agente de IA no n8n que agenda horários: entende texto, áudio e imagem, consulta a disponibilidade e cria e remove agendamentos.',
          tags: 'n8n · IA',
          detail: {
            summary: 'Agente de IA no n8n que agenda os horários de uma barbearia.',
            features: [
            'Entende texto, áudio e imagem',
            'Consulta a disponibilidade',
            'Cria e remove agendamentos',
          ],
            stack: [
            { name: 'n8n', icon: 'n8n' },
          ],
          },
        },
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
        { k: 'Segurança', note: 'Uso o OWASP Top 10 como referência no desenho e na revisão.', tech: [{ name: 'OWASP', icon: 'owasp' }] },
      ],
    },
    path: {
      label: 'Trajetória',
      lead: 'Comecei no suporte e fui para o código.',
      now: 'agora',
      legend: { work: 'trabalho', edu: 'formação', side: 'projeto paralelo' },
      rows: [
        { year: '2023', period: 'jan/2023 – jun/2024', what: 'Atendimento e certificação digital', where: 'IFTEC Certificadora', note: 'Cargo: analista de sistema. Atendimento ao cliente e emissão de certificado digital.' },
        { year: '2023', period: '2023 – 2026', what: 'Engenharia de Software', where: 'UNIFAN', note: 'Bacharelado, hoje no 7º período.', kind: 'edu' },
        { year: '2023', period: 'início da faculdade', what: 'Primeiras landing pages', where: 'HTML, CSS e JavaScript', note: 'Aprendi a base da web e fiz duas landing pages.', tag: 'estudo', kind: 'side' },
        { year: '2024', period: 'ago/2024 – ago/2025', what: 'Suporte ao sistema de cartório', where: 'Softwiki Tecnologia', note: 'Cargo: analista de sistema. Helpdesk do sistema de cartório, com suporte remoto via AnyDesk.' },
        { year: '2025', period: 'abr/2025', what: 'GS Sabores', where: 'Restaurante em Goiânia', note: 'Meu primeiro sistema: pedidos, produtos, categorias e aviso ao cliente por WhatsApp.', tag: 'fora do expediente', kind: 'side' },
        { year: '2025', period: 'ago/2025 – atual', what: 'Analista de suporte técnico', where: 'Orius Tecnologia', note: 'Entrada na empresa onde hoje desenvolvo.' },
        { year: '2025', period: 'out/2025', what: 'Oppus', where: 'Marketing e promoção de eventos, Uberlândia/MG', note: 'Sistema dedicado para a empresa, feito em paralelo ao trabalho.', tag: 'fora do expediente', kind: 'side' },
        { year: '2026', period: 'abr/2026 – atual', what: 'Desenvolvedor full stack júnior', where: 'Orius Tecnologia', note: 'Recriando em web (React e Python) o sistema legado em Delphi para cartórios, em time de 3 devs. Cuido das integrações com as centrais, das regras de negócio cartorárias e de boa parte das melhorias visuais.', kind: 'now' },
        { year: '2026', period: '2026', what: 'Weave', where: 'Motor de relatórios para web', note: 'Relatórios descritos em JSON, inspirado no FastReport e no Figma, gerando PDF.', tag: 'projeto pessoal', kind: 'side' },
        { year: '2026', period: '2026 – em finalização', what: 'Clivra', where: 'SaaS para clínicas odontológicas', note: 'Meu maior projeto até agora, na reta final de desenvolvimento.', tag: 'em finalização', kind: 'side' },
      ],
    },
    contact: {
      label: 'Contato',
      lead: 'Tem um projeto ou uma vaga? Escolha o caminho.',
      project: 'Tenho um projeto',
      role: 'Tenho uma vaga',
      resume: 'Currículo (PDF)',
      github: 'GitHub',
    },
  },
  en: {
    role: 'Full stack developer',
    available: 'Goiânia, Brazil',
    hero: {
      lines: ['I build web systems', 'end to end', 'and ship them.'],
      sub: 'Junior full stack at Orius, where I rebuild notary-office systems for the web. I turn real needs into applications, integrations and automations, from design to deployment.',
    },
    about: {
      label: 'About',
      paragraphs: [
        "I'm a full stack developer based in Goiânia, building web systems for notary and registry offices at Orius Tecnologia. My path started in technical support, where I learned to deal with real problems, understand users' needs and investigate what happens behind a system.",
        'Today I bring that mindset to development: I build interfaces, APIs, integrations and automations, following the work until the application is ready to run in the real world.',
        'Outside of work I build my own projects, such as Weave and Clivra, exploring challenges that range from reporting tools to SaaS products. I like to understand the problem before choosing the technology, and I value solutions that are clear, secure and can evolve without becoming hard to maintain.',
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
      labels: { open: 'View details', close: 'Close', status: 'Status', context: 'Context', features: 'What it does', stack: 'Tech', notes: 'Notes' },
      items: [
        {
          name: 'Clivra',
          desc: 'SaaS for dental clinics.',
          tags: 'SaaS · in testing',
          detail: {
            summary: 'SaaS that brings everything a dental clinic needs into a single system.',
            status: 'In testing with one user for 1 month, collecting feedback and adapting the product.',
            features: [
            'Scheduling and detailed appointments',
            'Client management and anamnesis',
            'Quotes and payment slips, sent by email and WhatsApp',
            'A client portal to book within the clinic\'s hours',
            'Financial management',
            'Full production, performance and financial reports',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Prisma' },
            { name: 'PostgreSQL', icon: 'postgresql' },
            { name: 'Redis', icon: 'redis' },
            { name: 'BullMQ (workers)' },
            { name: 'Amazon S3' },
            { name: 'Resend' },
          ],
          },
        },
        {
          name: 'Oppus',
          desc: 'System for an in-person events company in Uberlândia.',
          tags: 'Real client · Solo',
          detail: {
            summary: 'A dedicated system for an in-person events company in Uberlândia, replacing a generic one that did not fit their operation.',
            context: 'I was hired by Iaxion Automação, whom I met through networking. The project had been started by another developer who dropped out midway. I took over everything and finished development in a little over 3 months.',
            features: [
            'Management of clients, promoters, suppliers, events and uniforms',
            'Financial management',
            'Allocating promoters to events, with daily shifts to fulfil and tracking',
            'A web panel for promoters to clock in with location, upload event photos and log expenses and transfers',
            'WhatsApp alerts to the team about anomalies, such as a promoter who did not clock in or a bill to pay',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'Sequelize' },
            { name: 'Zod' },
            { name: 'PostgreSQL', icon: 'postgresql' },
            { name: 'Amazon S3' },
          ],
            notes: [
            'At the time I did not yet have a good grasp of caching.',
            'I do not follow the current state of the system.',
          ],
          },
        },
        {
          name: 'GS Sabores',
          desc: 'Order system for a restaurant in Goiânia: orders, products, categories and WhatsApp notifications to customers.',
          tags: 'Real client · WhatsApp',
          detail: {
            summary: 'My first system: order management for a restaurant in Goiânia.',
            features: [
            'Orders',
            'Products and categories',
            'WhatsApp notifications to customers',
          ],
            stack: [
          ],
          },
        },
        {
          name: 'Weave',
          desc: 'Web report engine with a visual editor: ready-made templates, simple components and real-time preview. You describe it in JSON, it renders the PDF.',
          tags: 'Visual editor · JSON → PDF',
          detail: {
            summary: 'A customizable web report engine, with a simple, modern look designed around the end user.',
            context: 'The idea comes from FastReport, which lets you build reports however you like. While rebuilding Orius\'s system for the web, the legacy one relied on FastReport and we had to recreate that capability. I built it outside work hours, and Orius uses it as a tester for the new system.',
            features: [
            'Reports described in JSON, rendered to PDF',
            'Visual editor with ready-made templates and simple components',
            'Real-time preview',
            'AI assistant (gpt-6-luna) to help with edits',
          ],
            stack: [
            { name: 'React', icon: 'react' },
            { name: 'TypeScript', icon: 'typescript' },
            { name: 'Node.js', icon: 'nodejs' },
            { name: 'n8n', icon: 'n8n' },
            { name: 'Redis', icon: 'redis' },
          ],
            notes: [
            'The Node back end was not strictly necessary, since the front end could talk to n8n directly. I kept it for code-pattern reasons.',
          ],
          },
        },
        {
          name: 'Barbershop automation',
          desc: 'AI agent on n8n that books appointments: understands text, audio and images, checks availability, and creates and removes bookings.',
          tags: 'n8n · AI',
          detail: {
            summary: 'An AI agent on n8n that books appointments for a barbershop.',
            features: [
            'Understands text, audio and images',
            'Checks availability',
            'Creates and removes bookings',
          ],
            stack: [
            { name: 'n8n', icon: 'n8n' },
          ],
          },
        },
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
        { k: 'Security', note: 'I use the OWASP Top 10 as a reference in design and review.', tech: [{ name: 'OWASP', icon: 'owasp' }] },
      ],
    },
    path: {
      label: 'Path',
      lead: 'I started in support and moved into code.',
      now: 'now',
      legend: { work: 'job', edu: 'education', side: 'side project' },
      rows: [
        { year: '2023', period: 'Jan/2023 – Jun/2024', what: 'Customer service and digital certificates', where: 'IFTEC Certificadora', note: 'Title: systems analyst. Customer service and digital certificate issuing.' },
        { year: '2023', period: '2023 – 2026', what: 'Software Engineering', where: 'UNIFAN', note: "Bachelor's degree, now in the 7th semester.", kind: 'edu' },
        { year: '2023', period: 'start of college', what: 'First landing pages', where: 'HTML, CSS and JavaScript', note: 'Learned the web basics and built two landing pages.', tag: 'learning', kind: 'side' },
        { year: '2024', period: 'Aug/2024 – Aug/2025', what: 'Notary-office system support', where: 'Softwiki Tecnologia', note: 'Title: systems analyst. Helpdesk for a notary-office system, with remote support over AnyDesk.' },
        { year: '2025', period: 'Apr/2025', what: 'GS Sabores', where: 'Restaurant in Goiânia', note: 'My first system: orders, products, categories and WhatsApp notifications to customers.', tag: 'after hours', kind: 'side' },
        { year: '2025', period: 'Aug/2025 – present', what: 'Technical support analyst', where: 'Orius Tecnologia', note: 'How I joined the company where I now build software.' },
        { year: '2025', period: 'Oct/2025', what: 'Oppus', where: 'Event marketing and promotion, Uberlândia/MG', note: 'A dedicated system for the company, built alongside my job.', tag: 'after hours', kind: 'side' },
        { year: '2026', period: 'Apr/2026 – present', what: 'Junior full stack developer', where: 'Orius Tecnologia', note: 'Rebuilding the legacy Delphi system for notary and registry offices as a web app (React and Python), in a team of 3 devs. I handle integrations with the registry hubs, the business rules of each office type and much of the visual improvements.', kind: 'now' },
        { year: '2026', period: '2026', what: 'Weave', where: 'Web report engine', note: 'Reports described in JSON, inspired by FastReport and Figma, rendering to PDF.', tag: 'personal project', kind: 'side' },
        { year: '2026', period: '2026 – wrapping up', what: 'Clivra', where: 'SaaS for dental clinics', note: 'My biggest project so far, in its final stretch of development.', tag: 'wrapping up', kind: 'side' },
      ],
    },
    contact: {
      label: 'Contact',
      lead: 'Got a project or a role? Pick a path.',
      project: 'I have a project',
      role: 'I have a role',
      resume: 'Resume (PDF)',
      github: 'GitHub',
    },
  },
}

export const EMAIL = ['souzaioshua2234', 'gmail.com'].join('@')
export const LINKEDIN = 'https://linkedin.com/in/ioshua-souza/'
export const WHATSAPP = { number: '5562984883324', display: '(62) 98488-3324' }
// Preencha quando existirem; vazio = o link não aparece.
export const RESUME_URL: Record<Lang, string> = { pt: '', en: '' }
export const GITHUB_URL: string = ''
