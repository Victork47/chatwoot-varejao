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
      // Departamentos correspondentes aos Times do Chatwoot
      departments: [
        {
          id: 'suporte-meus-produtos',
          name: 'Suporte Meus Produtos',
          description: 'Suporte para produtos',
          icon: 'document',
          color: '#00c4a2',
          message: '📦 [Suporte Meus Produtos]\n\nOlá! Preciso de ajuda com meus produtos.',
        },
        {
          id: 'suporte-fornecedor',
          name: 'Suporte Fornecedor',
          description: 'Comprar em atacado',
          icon: 'globe',
          color: '#6366f1',
          message: '🏢 [Suporte Fornecedor]\n\nOlá! Tenho interesse em comprar em atacado.',
        },
        {
          id: 'suporte-sms',
          name: 'Suporte Sms',
          description: 'Suporte para SMS Virtual',
          icon: 'chat',
          color: '#f59e0b',
          message: '💬 [Suporte Sms]\n\nOlá! Preciso de suporte com o SMS Virtual.',
        },
        {
          id: 'suporte-duvidas-produtos',
          name: 'Suporte Duvidas Produtos',
          description: 'Dúvidas sobre produtos',
          icon: 'emoji',
          color: '#ec4899',
          message: '❓ [Suporte Duvidas Produtos]\n\nOlá! Tenho dúvidas sobre produtos.',
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
          <FluentIcon :icon="dept.icon" size="20" />
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
  gap: 8px; /* Reduced gap */
  padding: 8px; /* Reduced padding */
  background: rgba(30, 30, 35, 0.4);
  backdrop-filter: blur(16px) saturate(150%);
  -webkit-backdrop-filter: blur(16px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px; /* Smaller radius */
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  min-height: 50px; /* Ensure minimum click area */
  
  &:hover {
    background: rgba(40, 40, 45, 0.5);
    border-color: rgba(0, 196, 162, 0.2);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.98);
  }
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px; /* Smaller icon box */
  height: 32px;
  min-width: 32px;
  border-radius: 8px;
  flex-shrink: 0;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0px; /* Tighter vertical spacing */
  overflow: hidden;
  justify-content: center;
  
  .card-title {
    font-size: 12px; /* Smaller title */
    font-weight: 600;
    color: #f0f0f0;
    white-space: normal; /* Allow wrapping */
    line-height: 1.2;
    overflow: hidden;
    /* Remove ellipsis if wrapping is desired, or keep line-clamp */
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  
  .card-description {
    font-size: 10px; /* Smaller description */
    color: #9ca3af;
    line-height: 1.2;
    margin-top: 2px;
    display: -webkit-box;
    -webkit-line-clamp: 1; /* Limit lines */
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
