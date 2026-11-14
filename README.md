# Health Clinic

Site institucional de uma clínica de saúde com **sistema de agendamento de consultas**: o paciente marca e cancela consultas online, e a clínica confirma os agendamentos, cadastra profissionais e acompanha os números num painel administrativo.

**Demo:** [health-clinic-by-vandilson.vercel.app](https://health-clinic-by-vandilson.vercel.app/)

![health-clinic](https://github.com/user-attachments/assets/b2cc60c4-5339-4911-8822-17268c35ee34)

## Funcionalidades

### Paciente
- Cadastro e login com e-mail/senha ou Google.
- Perfil com CPF, telefone e endereço. Só quem tem o perfil completo pode agendar.
- **Agendamento:** escolhe especialidade, profissional, data e horário. O calendário só libera os dias de atendimento, e a lista mostra só os horários livres e futuros.
- **Minhas consultas:** lista as próximas consultas e as anteriores, com status (aguardando confirmação, confirmada ou cancelada).
- **Cancelamento** até 24h antes da consulta. Depois disso, só falando com a clínica.

### Admin (clínica)
- **Dashboard:** consultas confirmadas para hoje, consultas aguardando confirmação, total de pacientes e um gráfico de consultas por mês nos últimos 6 meses.
- **Consultas agendadas:** busca e filtros por médico e status. O admin confirma ou recusa as pendentes e cancela as confirmadas quando precisa.
- **Profissionais:** cadastro de médicos com agenda (datas e horários) e edição da agenda. Uma data ou um horário que já tem consulta marcada não pode ser removido.
- **Pacientes:** lista com o total de consultas confirmadas e a data da última consulta.

## Tecnologias

- [Next.js 14](https://nextjs.org/) (App Router), React 18 e TypeScript
- Tailwind CSS e [shadcn/ui](https://ui.shadcn.com/)
- Firebase Authentication, Firebase Realtime Database e Firebase Admin SDK (verificação de token na rota `/api/auth`)
- TanStack Query, React Hook Form e Zod, date-fns, react-day-picker, Recharts e Zustand
- Jest e Testing Library
- Deploy na Vercel e CI no GitHub Actions

## Como o agendamento funciona

- **Agenda do profissional:** uma lista de **datas** e uma lista de **horários**. O profissional atende em todos os horários, em todas as datas.
- **Sem horário duplicado:** cada consulta grava, **na mesma escrita atômica** (ou tudo é salvo, ou nada é), uma "tranca" em `bookedSlots/<especialidade>/<profissional>/<data>/<horário>`. As regras de segurança recusam criar uma tranca que já existe. Se dois pacientes tentarem o mesmo horário ao mesmo tempo, só o primeiro consegue.
- **Status:** toda consulta nasce `pendente`. O admin muda para `confirmada` ou `cancelada`. Cancelar não apaga a consulta: muda o status e remove a tranca, e o horário volta a ficar livre.
- **Números do admin:** são calculados a partir das consultas, e não de contadores salvos à parte. Assim nunca ficam dessincronizados.

### Estrutura do banco (Realtime Database)

```
users/<uid>/profile                         dados do paciente
appointments/<id>                           consultas (patientId, médico, data, horário, status, startsAt)
bookedSlots/<especialidade>/<médico>/<data>/<horário>   tranca de cada vaga ocupada
services/consultation/<especialidade>/<médico>          profissionais e agenda { date[], time[] }
specialties                                  lista de especialidades
```

### Segurança

As regras ficam em [`database.rules.json`](database.rules.json) e são a fonte da verdade:

| Parte do banco | Ler | Gravar |
|---|---|---|
| Perfil | o dono e o admin | o dono e o admin |
| Consultas | o paciente vê as próprias, o admin vê todas | o paciente cria as próprias (`pendente`, no futuro) e só pode cancelar com mais de 24h de antecedência |
| Trancas de vaga | qualquer pessoa logada | criar só se a vaga estiver livre; apagar só quem reservou ou o admin |
| Profissionais e especialidades | qualquer pessoa logada | só o admin |

O admin é identificado pelo UID dele no Firebase Auth, que aparece em `utils/constants.ts` e em `database.rules.json`.

## Rodando localmente

**Pré-requisitos:** Node.js 20+ e um projeto no [Firebase](https://console.firebase.google.com/) com:
- **Authentication**, com os provedores *E-mail/senha* e *Google* ativos;
- **Realtime Database** criado.

1. **Instale as dependências**
   ```bash
   npm install
   ```
2. **Configure as variáveis de ambiente.** Copie o exemplo e preencha com os dados do seu projeto. As instruções estão dentro do arquivo.
   ```bash
   cp .env.example .env.local
   ```
3. **Publique as regras de segurança.** Cole o conteúdo de `database.rules.json` em *Realtime Database → Regras* no console do Firebase e clique em *Publicar*.
4. **Defina o admin.** Crie uma conta no app e troque o UID que aparece em `utils/constants.ts` e em `database.rules.json` pelo UID dessa conta. Depois publique as regras de novo.
5. **Cadastre os dados iniciais.** Crie o nó `specialties` com a lista de especialidades, por exemplo `["cardiologia", "pediatria"]`. Depois, entre como admin e cadastre os profissionais e as agendas em **Profissionais Cadastrados**.
6. **Rode o projeto**
   ```bash
   npm run dev
   ```
   Abra [http://localhost:3000](http://localhost:3000).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm start` | Sobe o build de produção |
| `npm run lint` | ESLint |
| `npm test` | Testes (Jest) |

Os testes cobrem as regras de agenda (datas e horários disponíveis e o limite de 24h) e os cálculos do painel do admin.

## Deploy

- **Hospedagem:** o projeto roda na Vercel. Configure as mesmas variáveis do `.env.example` em *Settings → Environment Variables*.
- **CI:** o workflow em `.github/workflows/ci.yml` roda os testes e o build a cada push e a cada PR para a `master`.

## Estrutura de pastas

```
app/
  admin/            dashboard, consultas, profissionais e pacientes
  cliente/          agendar consulta, minhas consultas e perfil
  api/auth/         verificação do token de login (Firebase Admin)
  components/       componentes da landing page, do admin e do cliente
components/ui/      componentes do shadcn/ui
firebase/           configuração e serviços do Firebase
hooks/              hooks do admin
utils/              tipos, constantes e funções de regras (agenda e estatísticas)
__tests__/          testes
database.rules.json regras de segurança do Realtime Database
```

## Metodologia

O projeto foi organizado com práticas ágeis (Kanban e Scrum) num quadro do GitHub Projects: [link do kanban](https://github.com/users/vandilsonbrito/projects/2/views/1).

## Licença

[MIT](LICENSE)
