<script>
import DepartmentCards from 'widget/components/DepartmentCards.vue';
import { mapGetters } from 'vuex';
import { useRouter } from 'vue-router';
import configMixin from 'widget/mixins/configMixin';

export default {
  name: 'Home',
  components: {
    DepartmentCards,
  },
  mixins: [configMixin],
  setup() {
    const router = useRouter();
    return { router };
  },
  computed: {
    ...mapGetters({
      conversationSize: 'conversation/getConversationSize',
    }),
  },
  methods: {
    startConversation() {
      if (this.preChatFormEnabled && !this.conversationSize) {
        return this.router.replace({ name: 'prechat-form' });
      }
      return this.router.replace({ name: 'messages' });
    },
  },
};
</script>

<template>
  <div class="z-50 flex flex-col justify-center flex-1 w-full p-4 gap-4 overflow-y-auto">
    <!-- Cards de Departamentos -->
    <DepartmentCards />
  </div>
</template>

