# 🎁 Amigo Secreto

Mini-aplicação web para organizar eventos de amigo secreto. Os usuários podem se cadastrar, criar grupos, sortear os participantes e receber por email quem será seu amigo secreto.

Tecnologias utilizadas:
- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/) (Auth + Database)
- [Resend](https://resend.com/) (Envio de Emails)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

Para evitar problemas com o Tailwind use esses plugins:
- Use the PostCSS plugin
- Use the Tailwind intelliSense plugin

---

## 🔧 FASE 1 – Setup e Infraestrutura

### **Responsável 1 (Setup e Autenticação):**
- [ ] Criar projeto com `npx create-next-app@latest`
- [ ] Instalar e configurar TailwindCSS e shadcn/ui
- [ ] Criar projeto no Supabase
- [ ] Configurar Supabase Auth com Magic Link
- [ ] Implementar telas de login e cadastro com Supabase Auth

### **Responsável 2 (Banco e API):**
- [ ] Criar tabelas no Supabase: `users`, `groups`, `participants`, `secrets`
- [ ] Validar regras (ex: usuário logado não pode ser removido)
- [ ] Criar endpoints (ou server actions) para:
  - [ ] Criar grupo
  - [ ] Adicionar participantes
  - [ ] Sortear amigos secretos
  - [ ] Buscar grupos por usuário logado

### **Enzo Queiroz (Envio de Emails):**
- [ ] Criar conta no Resend
- [ ] Integrar Resend com Next.js
- [ ] Criar template de email com nome do amigo secreto
- [ ] Enviar email após sorteio automático
- [ ] Testar com domínio de testes

---

## 🧑‍🎨 FASE 2 – UI/UX e Componentes

### **Responsável 1 (Layout base e navegação):**
- [ ] Criar layout padrão com Header/Navbar
- [ ] Implementar rotas: `/login`, `/meus-grupos`, `/grupo/[id]`
- [ ] Criar botão para “Criar Novo Grupo”

### **Responsável 2 (Tela de cadastro de grupo):**
- [ ] Formulário com nome do grupo + lista de participantes (nome e email)
- [ ] Primeiro participante = usuário logado (fixo e não removível)
- [ ] Chamar action para salvar grupo + sortear amigo secreto

### **Responsável 3 (Tela de grupos e tela do grupo):**
- [ ] Listar grupos do usuário logado com nome + data
- [ ] Ao clicar, redirecionar para tela do grupo
- [ ] Mostrar lista de participantes
- [ ] Revelar o amigo secreto do usuário logado ao passar o mouse

---

## 💥 FASE 3 – Extras e Polimento

### **Todos juntos:**
- [ ] Responsividade e usabilidade
- [ ] Proteção de rotas (middleware para páginas privadas)
- [ ] Mensagens de feedback (ex: grupo criado, email enviado)
- [ ] Testes com emails reais (Resend)
- [ ] Deploy no [Vercel](https://vercel.com/)

---

## ✨ Extras (opcional)
- [ ] Adicionar lista de presentes por participante
- [ ] Permitir editar grupo e realizar novo sorteio
- [ ] Histórico de sorteios (versão avançada)

---

## 🛠️ O que você vai praticar
- Next.js (rotas, server actions, components)
- Supabase (auth, database, integration)
- shadcn/ui (componentes e personalização)
- TailwindCSS (estilização moderna)
- Resend (envio de emails programáticos)

---

> Projeto colaborativo entre Enzo Queiroz, Lucas Sanches, Paulo Araújo e demais membros... 🚀