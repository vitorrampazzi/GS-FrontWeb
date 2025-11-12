import json
import copy

# Nossos 3 perfis-base (templates) com a estrutura correta do PDF
templates = [
  {
    "id": 1,
    "nome": "Ana Clara Silva",
    "foto": "https://i.pravatar.cc/150?img=1",
    "cargo": "Engenheira de Software Pleno",
    "resumo": "Especialista em desenvolvimento de aplicações web escaláveis com React e Node.js. 5 anos de experiência.",
    "localizacao": "São Paulo/SP",
    "area": "Desenvolvimento",
    "habilidadesTecnicas": ["React", "Next.js", "Node.js", "Python", "SQL", "AWS"],
    "softSkills": ["Comunicação", "Liderança", "Resolução de Problemas", "Trabalho em Equipe"],
    "experiencias": [
      {
        "empresa": "TechCorp Solutions",
        "cargo": "Engenheira de Software Pleno",
        "inicio": "2022-01",
        "fim": "Presente",
        "descricao": "Liderança técnica no desenvolvimento do principal produto da empresa, usando React e microserviços Node.js."
      }
    ],
    "formacao": [
      {
        "curso": "Pós-graduação em Arquitetura de Software",
        "instituicao": "FIAP",
        "ano": 2023
      }
    ],
    "projetos": [
      {
        "titulo": "Plataforma de E-commerce",
        "link": "https://github.com/ana/ecommerce",
        "descricao": "Projeto pessoal de um e-commerce completo com Next.js, Stripe e Vercel."
      }
    ],
    "certificacoes": ["AWS Certified Cloud Practitioner", "Scrum Fundamentals Certified"],
    "idiomas": [
      { "idioma": "Inglês", "nivel": "Fluente" }
    ],
    "areaInteresses": ["IA ética", "Educação em Tecnologia", "Computação Quântica"]
  },
  {
    "id": 2,
    "nome": "Bruno Costa",
    "foto": "https://i.pravatar.cc/150?img=2",
    "cargo": "UX/UI Designer Sênior",
    "resumo": "Designer focado em soluções centradas no usuário, com 8 anos de experiência em prototipação e design systems.",
    "localizacao": "Recife/PE",
    "area": "Design",
    "habilidadesTecnicas": ["Figma", "Adobe XD", "Miro", "User Research", "HTML/CSS"],
    "softSkills": ["Empatia", "Criatividade", "Colaboração", "Comunicação Visual"],
    "experiencias": [
      {
        "empresa": "DesignNow",
        "cargo": "UX/UI Designer Sênior",
        "inicio": "2019-03",
        "fim": "Presente",
        "descricao": "Liderança da equipe de design de produto, responsável pela criação e manutenção do Design System."
      }
    ],
    "formacao": [
      {
        "curso": "Bacharelado em Design Digital",
        "instituicao": "UFPE",
        "ano": 2017
      }
    ],
    "projetos": [
      {
        "titulo": "App de Saúde Mental",
        "link": "https://behance.net/bruno/saudemental",
        "descricao": "Estudo de caso e protótipo de alta fidelidade para um aplicativo de bem-estar."
      }
    ],
    "certificacoes": ["Certified UX Professional (NN/g)"],
    "idiomas": [{ "idioma": "Inglês", "nivel": "Avançado" }],
    "areaInteresses": ["Design Inclusivo", "Acessibilidade Web", "Gamificação"]
  },
  {
    "id": 3,
    "nome": "Carla Dias",
    "foto": "https://i.pravatar.cc/150?img=3",
    "cargo": "Gerente de Projetos de TI",
    "resumo": "Profissional com certificação PMP e experiência em metodologias ágeis (Scrum, Kanban) para entrega de software.",
    "localizacao": "Rio de Janeiro/RJ",
    "area": "Gestão",
    "habilidadesTecnicas": ["Jira", "MS Project", "Scrum", "Kanban", "Gestão de Riscos"],
    "softSkills": ["Liderança", "Negociação", "Organização", "Gestão de Stakeholders"],
    "experiencias": [
      {
        "empresa": "FutureBank",
        "cargo": "Gerente de Projetos de TI",
        "inicio": "2021-01",
        "fim": "Presente",
        "descricao": "Gerenciamento de 4 squads de desenvolvimento para a plataforma de Open Banking."
      }
    ],
    "formacao": [
      {
        "curso": "MBA em Gestão de Projetos",
        "instituicao": "FGV",
        "ano": 2020
      }
    ],
    "projetos": [],
    "certificacoes": ["PMP - Project Management Professional", "CSM - Certified ScrumMaster"],
    "idiomas": [{ "idioma": "Inglês", "nivel": "Fluente" }],
    "areaInteresses": ["Metodologias Ágeis", "Fintechs", "Liderança Feminina"]
  }
]

# Lista final que vai conter os 60 perfis
profiles_list = []
total_profiles = 60
num_templates = len(templates)

print(f"Gerando {total_profiles} perfis...")

# Loop para criar os 60 perfis
for i in range(total_profiles):
    # Escolhe um template para basear (Ana, Bruno, Carla, Ana, Bruno, Carla, ...)
    template = templates[i % num_templates]
    
    # Cria uma cópia profunda para não modificar o original
    new_profile = copy.deepcopy(template)
    
    # Cria um ID único (de 1 a 60)
    new_id = i + 1
    
    # Atualiza o ID e a Foto
    new_profile["id"] = new_id
    new_profile["foto"] = f"https://i.pravatar.cc/150?img={new_id}" # Foto única!
    
    # Adiciona na lista final
    profiles_list.append(new_profile)

# Salva a lista final no arquivo profiles.json
# indent=2 deixa o arquivo formatado e bonito
with open('profiles.json', 'w', encoding='utf-8') as f:
    json.dump(profiles_list, f, indent=2, ensure_ascii=False)

print(f"Sucesso! O arquivo 'profiles.json' foi criado com {len(profiles_list)} perfis.")