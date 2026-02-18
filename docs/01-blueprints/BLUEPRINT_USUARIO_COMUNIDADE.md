# BLUEPRINT DO USUÁRIO E COMUNIDADE — Protocolo Bússola

## 1) O que é o webapp
O Protocolo Bússola é uma ferramenta digital de apoio para a escola agir com mais segurança quando surge uma situação de risco, sofrimento, violência ou vulnerabilidade envolvendo estudantes. Ele organiza passos de acolhimento, ajuda na tomada de decisão e facilita o acesso à rede de proteção. O sistema foi pensado para uso institucional da equipe escolar, em linguagem prática, com foco em proteger e encaminhar com responsabilidade. Também permite consultar o protocolo completo e os anexos de registro em formato simples para leitura e impressão. O objetivo é reduzir dúvidas em momentos de pressão e fortalecer respostas mais rápidas, cuidadosas e coordenadas.

## 2) Para quem foi criado
- Professores(as)
- POC/Coordenação pedagógica
- Direção e vice-direção
- Secretaria (apoio administrativo)
- Equipe escolar em geral

## 3) Para que ele serve
- Ajudar a identificar prioridade e gravidade de uma situação.
- Indicar “o que fazer agora” de forma objetiva.
- Mostrar quem acionar na rede de proteção.
- Apoiar registros iniciais com anexos padronizados.
- Organizar linguagem e conduta institucional para reduzir exposição indevida.

## 4) Como funciona o acolhimento e encaminhamento (visão geral)
1. A equipe identifica uma situação.
2. Usa o **Decisor** para classificar e orientar ação imediata.
3. Consulta contatos em **Rede** quando necessário.
4. Registra de forma objetiva com os **Modelos/Anexos**.
5. Escala para coordenação/direção conforme gravidade.
6. Faz acompanhamento e retorno institucional.

## 5) Passo a passo por perfil
### Professor(a)
1. No menu **Decisor**, responda às perguntas observando fatos.
2. Em caso de urgência, siga ação imediata sem esperar.
3. Registre o essencial no mesmo dia (sem julgamento, apenas fatos).
4. Comunique coordenação/POC para continuidade.

### POC/Coordenação
1. Recebe o registro inicial.
2. Organiza escuta qualificada e classifica prioridade.
3. Define encaminhamento interno/externo com direção, quando necessário.
4. Garante documentação e acompanhamento.

### Direção/Vice
1. Assume casos graves e de risco elevado.
2. Aciona rede externa e órgãos competentes conforme protocolo.
3. Supervisiona sigilo, registro e comunicação institucional.
4. Define fechamento do caso com rastreabilidade mínima.

## 6) O que acontece após enviar uma demanda
- A demanda passa por triagem.
- Recebe prioridade (baixo, médio, alto, emergencial).
- Pode gerar encaminhamento interno e/ou externo.
- Deve ter acompanhamento até estabilização/encerramento responsável.

## 7) Sigilo e cuidado
- As informações são de uso restrito a quem precisa atuar no caso.
- Evite exposição em conversas informais ou grupos não autorizados.
- Sigilo não significa omissão: em risco, a escola deve acionar proteção.

## 8) Limites do sistema
Este webapp **não substitui**:
- serviços de saúde,
- Conselho Tutelar,
- polícia/emergência,
- avaliação profissional e decisão da gestão.

Ele é uma ferramenta de apoio à decisão escolar.

## 9) Boas práticas de uso
- Registre fatos observáveis (evite opiniões e rótulos).
- Use linguagem objetiva e respeitosa.
- Não faça investigação improvisada com repetição de relato.
- Em dúvida, escale para a gestão.
- Em risco iminente, acione emergência imediatamente.

## 10) FAQ (12 perguntas)
1. **Quem pode ver as informações?**  
Somente profissionais com necessidade institucional de atuação no caso.

2. **Quando devo usar o Decisor?**  
Sempre que houver situação de risco, vulnerabilidade ou dúvida relevante.

3. **E se eu não souber classificar a situação?**  
Use a opção “Não sei / preciso de apoio” e escale para coordenação/gestão.

4. **Quando é urgente?**  
Quando há risco imediato à vida, integridade física ou segurança.

5. **O sistema substitui ligação para emergência?**  
Não. Em urgência, primeiro acione 190/192/193 conforme o caso.

6. **O que devo registrar primeiro?**  
Data, local, fato observado, ação tomada e quem foi acionado.

7. **Posso compartilhar detalhes em grupo de mensagens?**  
Não. Preserve sigilo e compartilhe apenas com responsáveis institucionais.

8. **Quem decide encaminhamento externo?**  
Coordenação e direção, conforme gravidade e protocolo.

9. **Como corrigir um registro?**  
Faça retificação objetiva, com data e responsável, sem apagar histórico.

10. **Onde encontro formulários oficiais?**  
No menu **Modelos** e nos anexos institucionais.

11. **O que fazer se a internet cair?**  
Continue com conduta de proteção e acione rede por telefone; use o app como apoio quando possível.

12. **Quem tirar dúvidas sobre uso do sistema?**  
POC/coordenação e gestão escolar.

## 11) Orientações institucionais importantes
- Em situação crítica, priorize proteção imediata.
- Registre no mesmo dia o mínimo necessário para rastreabilidade.
- Escale casos graves para direção/vice sem atraso.
- Preserve dignidade, privacidade e não revitimização.

## 12) Links internos úteis
- Protocolo completo: `/#/protocolo`
- Decisor: `/#/decisor`
- Rede de proteção: `/#/rede`
- Modelos e anexos: `/#/modelos`
- FAQ: `/#/faq`
- Glossário: `/#/glossario`
- Guia rápido operacional: `docs/04-uso-e-treinamento/GUIA_RAPIDO_OPERACIONAL.md`
- Privacidade e dados: `docs/03-governanca-e-lgpd/PRIVACIDADE_E_DADOS.md`

## Evidências no repo
- Rotas e navegação: `App.tsx`, `components/Layout.tsx`
- Decisor e ações: `components/DecisionWizard.tsx`, `components/ActionCard.tsx`
- Rede e mapa: `pages/NetworkPage.tsx`, `components/NetworkMap.tsx`
- Modelos: `pages/ModelosPage.tsx`, `data/anexosMeta.ts`, `public/anexos/*.md`
- Protocolo completo: `components/ProtocoloViewer.tsx`, `public/protocol/protocolo.md`
