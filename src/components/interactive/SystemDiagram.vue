<script setup lang="ts">
/** A keyboard-accessible layer explorer grounded in the public Java reservation architecture. */
import { ref } from 'vue';
import type { Locale } from '../../i18n';
const props = defineProps<{ locale: Locale }>();
const active = ref(0);
const labels =
  props.locale === 'en'
    ? ['Client', 'Transport', 'Domain', 'Persistence']
    : ['Cliente', 'Transporte', 'Domínio', 'Persistência'];
const details =
  props.locale === 'en'
    ? [
        'Swing and console clients collect input and display responses. Only the server needs database access.',
        'TCP sockets carry JSON messages. ServidorTcp serves each connection in a thread and handles protocol validation.',
        'User, room and reservation services validate domain rules before handing changes to the repository.',
        'JDBC transactions and a locked control row protect consistency in MySQL/MariaDB. This design may constrain concurrency.',
      ]
    : [
        'Clientes Swing e console recebem entradas e exibem respostas. Apenas o servidor precisa de acesso ao banco.',
        'Sockets TCP transportam mensagens JSON. ServidorTcp atende cada conexão em uma thread e trata a validação do protocolo.',
        'Serviços de usuários, salas e reservas validam regras de domínio antes de encaminhar alterações ao repositório.',
        'Transações JDBC e uma linha de controle bloqueada protegem a consistência no MySQL/MariaDB. Essa escolha pode limitar a concorrência.',
      ];
const tech = ['Swing / console', 'TCP + JSON', 'Java services', 'MySQL / JDBC'];
</script>
<template>
  <div class="system-diagram">
    <div class="diagram-toolbar">
      <span class="mono">reservation.system</span
      ><span class="mono">JAVA / TCP</span>
    </div>
    <svg class="diagram-paths" viewBox="0 0 480 124" aria-hidden="true">
      <path d="M52 62H428" />
      <circle v-for="x in [52, 178, 304, 428]" :key="x" :cx="x" cy="62" r="4" />
    </svg>
    <div
      class="diagram-nodes"
      role="group"
      :aria-label="
        locale === 'en' ? 'Architecture layers' : 'Camadas da arquitetura'
      "
    >
      <button
        v-for="(label, index) in labels"
        :key="label"
        :class="{ selected: active === index }"
        :aria-pressed="active === index"
        aria-controls="layer-detail"
        @click="active = index"
      >
        <svg v-if="index === 0" viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="5" width="24" height="17" rx="2" />
          <path d="M10 28h12m-6-6v6" />
        </svg>
        <svg v-else-if="index === 1" viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 10h20M6 22h20m-6-18 6 6-6 6M12 16l-6 6 6 6" />
        </svg>
        <svg v-else-if="index === 2" viewBox="0 0 32 32" aria-hidden="true">
          <path d="m16 3 12 7-12 7L4 10zm-12 14 12 7 12-7M4 24l12 7 12-7" />
        </svg>
        <svg v-else viewBox="0 0 32 32" aria-hidden="true">
          <ellipse cx="16" cy="7" rx="11" ry="4" />
          <path d="M5 7v18c0 5 22 5 22 0V7M5 16c0 5 22 5 22 0" />
        </svg>
        <span>{{ label }}</span><small>{{ tech[index] }}</small>
      </button>
    </div>
    <div
      id="layer-detail"
      class="diagram-detail"
      aria-live="polite"
      aria-atomic="true"
    >
      <span class="mono accent">{{ labels[active] }}</span>
      <p>{{ details[active] }}</p>
    </div>
    <div class="diagram-bottom mono">
      <span>{{
        locale === 'en' ? 'SELECT A LAYER TO EXPLORE' : 'SELECIONE UMA CAMADA'
      }}</span><span aria-hidden="true">&lt; / &gt;</span>
    </div>
  </div>
</template>
