<script>
import { mapGetters } from 'vuex';
import { useRouter } from 'vue-router';
import FluentIcon from 'shared/components/FluentIcon/Index.vue';

export default {
  name: 'DepartmentCards',
  components: {
    FluentIcon,
  },
  setup() {
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      // Configura os departamentos aqui
      departments: [
        {
          id: 'suporte-produtos',
          name: 'Suporte Produtos',
          description: 'Dúvidas sobre seus produtos',
          icon: 'box',
          color: '#00c4a2',
          message: '📦 [Suporte Produtos]\n\nOlá! Preciso de ajuda com meus produtos.',
        },
        {
          id: 'suporte-fornecedor',
          name: 'Fornecedor',
          description: 'Comprar em atacado',
          icon: 'building-retail',
          color: '#6366f1',
          message: '🏢 [Fornecedor]\n\nOlá! Tenho interesse em comprar em atacado.',
        },
        {
          id: 'suporte-sms',
          name: 'Suporte SMS',
          description: 'Ajuda com SMS Virtual',
          icon: 'chat',
          color: '#f59e0b',
          message: '💬 [Suporte SMS]\n\nOlá! Preciso de suporte com o SMS Virtual.',
        },
        {
          id: 'duvidas-produtos',
          name: 'Dúvidas Produtos',
          description: 'Informações sobre produtos',
          icon: 'question-circle',
          color: '#ec4899',
          message: '❓ [Dúvidas Produtos]\n\nOlá! Tenho dúvidas sobre produtos.',
        },
      ],
    };
  },
  computed: {
    ...mapGetters({
      conversationSize: 'conversation/getConversationSize',
    }),
  },
  methods: {
    async selectDepartment(department) {
      // Limpa conversas anteriores se não houver conversa ativa
      if (!this.conversationSize) {
        await this.$store.dispatch('conversationAttributes/clearConversationAttributes');
      }
      
      // Cria conversa com mensagem do departamento
      await this.$store.dispatch('conversation/createConversation', {
        fullName: '',
        emailAddress: '',
        message: department.message,
        customAttributes: {
          department: department.id,
          department_name: department.name,
        },
      });
      
      // Navega para a tela de mensagens
      this.router.replace({ name: 'messages' });
    },
  },
};
</script>

<template>
  <div class="department-cards">
    <div class="cards-header">
      <span class="header-title">Como podemos ajudar?</span>
      <span class="header-subtitle">Selecione um departamento</span>
    </div>
    <div class="cards-grid">
      <button
        v-for="dept in departments"
        :key="dept.id"
        class="department-card"
        @click="selectDepartment(dept)"
      >
        <div class="card-icon" :style="{ backgroundColor: dept.color + '20', color: dept.color }">
          <FluentIcon :icon="dept.icon" size="24" />
        </div>
        <div class="card-content">
          <span class="card-title">{{ dept.name }}</span>
          <span class="card-description">{{ dept.description }}</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.department-cards {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 8px 0;
}

.cards-header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;
  
  .header-title {
    font-size: 16px;
    font-weight: 600;
    color: #e0e0e0;
  }
  
  .header-subtitle {
    font-size: 13px;
    color: #9ca3af;
  }
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.department-card {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: rgba(30, 30, 35, 0.7);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 196, 162, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s ease;
  text-align: left;
  
  &:hover {
    background: rgba(40, 40, 45, 0.8);
    border-color: rgba(0, 196, 162, 0.35);
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 10px;
  flex-shrink: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  
  .card-title {
    font-size: 13px;
    font-weight: 600;
    color: #f0f0f0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-description {
    font-size: 11px;
    color: #9ca3af;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

@media (max-width: 320px) {
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
