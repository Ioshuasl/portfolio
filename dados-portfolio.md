# Dados do portfólio (extraídos da sessão "Portfolio design e projetos")

## Perfil
- Desenvolvedor full stack júnior, Orius Tecnologia (Goiânia, presencial, tempo integral)
- Engenharia de Software na UNIFAN (bacharelado 2023–2026), 7º período
- Inglês avançado
- LinkedIn "Sobre" (a ajustar, ainda diz back-end): soluções enxutas, seguras e escaláveis
- Stack citada: JavaScript/TypeScript, Node.js, Express, NestJS, React, PostgreSQL, MySQL, APIs REST e integração com APIs externas, Git/GitHub, Docker, AWS, CI/CD, documentação e diagramação
- Competências em destaque: JavaScript, Node.js, SQL, trabalho em equipe, Git (27 no total no LinkedIn)
- Competências novas a citar: arquitetura, SOLID, OWASP, PRD/DDT, n8n com IA

## Experiência
- **Orius Tecnologia** (Goiânia)
  - Desenvolvedor full stack: abr/2026 até o momento (Python + FastAPI no back, React + TypeScript no front; prefere Node no back)
  - Analista de suporte técnico: ago/2025 até o momento
- **Softwiki Tecnologia**, analista de sistema: ago/2024 a ago/2025 (saída inferida; LinkedIn mostra "até o momento", o usuário confirmou que já saiu). Helpdesk para usuários do sistema de cartório via AnyDesk
- **IFTEC Certificadora**, analista de sistema: jan/2023 a jun/2024. Atendimento ao cliente e emissão de certificado digital

## Projetos
- **Início da faculdade (2023):** aprendeu HTML, CSS e JavaScript e fez 2 landing pages
- **GS Sabores (abr/2025):** primeiro sistema; gerenciamento de pedidos para restaurante em Goiânia (pedidos, produtos, categorias de produtos, notificação ao cliente via WhatsApp)
- **Opus (out/2025):** sistema dedicado para empresa de marketing e promoção de eventos em Uberlândia/MG
- **Weave (2026):** desenvolvido depois de entrar como desenvolvedor na Orius (abr/2026)
- **Clivra (2026):** em fase final de desenvolvimento
- GS Sabores e Opus foram feitos fora do expediente, em paralelo aos empregos (IFTEC, Softwiki, Orius)
- **Weave**: motor de relatórios para web, orientado a JSON, inspirado no FastReport e no Figma, gera PDF e outros formatos
- **Clivra**: SaaS próprio para clínicas odontológicas, desenvolvido sozinho (o nome foi ditado; confirmado como "Clivra")
- **Opus**: sistema para empresa de promoção e marketing de eventos presenciais de Uberlândia, desenvolvido sozinho; cliente veio por meio de uma empresa de automação que o contratou
- **Automação para barbearia**: n8n com IA
- Funcionalidades e stack detalhadas de Clivra e Opus: **ainda não informadas**
- Links de deploy públicos: **não informados**
- Código no Forgejo da VPS, **privado**: mostrar prints, GIFs, vídeos (Remotion) e descrição técnica, sem link de código
- Prints, documentação, GIFs e vídeos: o usuário disse que enviaria depois (não estão na sessão)

## Infra e práticas
- Deploy de todos os projetos em VPS Contabo, gerenciada com Easypanel e o terminal da Contabo
- Critérios OWASP, ISO/IEC 27001, cache com Redis, TanStack Query (cache de dados do servidor no front)

## Decisões de design
- Stack: Vite + React + TypeScript + Tailwind, build estático servido por Nginx no Easypanel
- Estilo: dark técnico minimalista, inteiramente interativo e dinâmico
- Estrutura: one-page com seções
- Idioma: português e inglês, com alternador
- Referências: https://21st.dev/ (componentes React + Tailwind estilo shadcn; plano grátis com 2 cópias/dia) e https://animejs.com/ (Anime.js v4, `npm i animejs`)
- Seções: Hero, Sobre, Projetos, Stack e práticas, Infra, Experiência e formação, Contato (e-mail, LinkedIn, GitHub se houver)
- Mapa 21st.dev / Anime.js:
  - Hero: hero animado + background/shader / texto com stagger
  - Projetos: cards/galeria com hover e vídeo em loop / reveal no scroll
  - Stack: grid de cards / stagger em grade a partir do centro
  - Infra: navegação/cards / SVG desenhado no scroll (VPS, Easypanel, Forgejo)
  - Experiência: cards / timeline sincronizada com o scroll
  - Extras: menu flutuante / elemento arrastável com mola (draggable)
- Cuidados: não misturar Anime.js e framer-motion no mesmo elemento; respeitar `prefers-reduced-motion`; reduzir shaders no celular; vídeos Remotion em MP4 leve com carregamento lazy

## Pendências
- Nome completo, e-mail, GitHub/LinkedIn (URLs), foto
- Funcionalidades/stack de Clivra e Opus, prints e vídeos
- Certificações e cursos, resultados concretos na Orius
- Mês de saída da Softwiki (assumido ago/2025)
