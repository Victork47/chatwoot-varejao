<script>
import { mapGetters } from 'vuex';
import { IFrameHelper, RNHelper } from 'widget/helpers/utils';
import { popoutChatWindow } from '../helpers/popoutHelper';
import FluentIcon from 'shared/components/FluentIcon/Index.vue';
import configMixin from 'widget/mixins/configMixin';
import { CONVERSATION_STATUS } from 'shared/constants/messages';
import { emitter } from 'shared/helpers/mitt';

export default {
  name: 'HeaderActions',
  components: { FluentIcon },
  mixins: [configMixin],
  props: {
    showPopoutButton: {
      type: Boolean,
      default: false,
    },
    showEndConversationButton: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isExpanded: false,
    };
  },
  computed: {
    ...mapGetters({
      conversationAttributes: 'conversationAttributes/getConversationParams',
      canUserEndConversation: 'appConfig/getCanUserEndConversation',
    }),
    canLeaveConversation() {
      return [
        CONVERSATION_STATUS.OPEN,
        CONVERSATION_STATUS.SNOOZED,
        CONVERSATION_STATUS.PENDING,
      ].includes(this.conversationStatus);
    },
    isIframe() {
      return IFrameHelper.isIFrame();
    },
    isRNWebView() {
      return RNHelper.isRNWebView();
    },
    showHeaderActions() {
      // Sempre mostrar actions para ter o botão expandir
      return true;
    },
    conversationStatus() {
      return this.conversationAttributes.status;
    },
    hasWidgetOptions() {
      return this.showPopoutButton || this.conversationStatus === 'open';
    },
  },
  methods: {
    popoutWindow() {
      this.closeWindow();
      const {
        location: { origin },
        chatwootWebChannel: { websiteToken },
        authToken,
      } = window;
      popoutChatWindow(
        origin,
        websiteToken,
        this.$root.$i18n.locale,
        authToken
      );
    },
    closeWindow() {
      if (IFrameHelper.isIFrame()) {
        IFrameHelper.sendMessage({ event: 'closeWindow' });
      } else if (RNHelper.isRNWebView) {
        RNHelper.sendMessage({ type: 'close-widget' });
      }
    },
    resolveConversation() {
      this.$store.dispatch('conversation/resolveConversation');
    },
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
      emitter.emit('widget-expand-toggle', this.isExpanded);
      // Comunicar com iframe pai para redimensionar
      if (IFrameHelper.isIFrame()) {
        IFrameHelper.sendMessage({ 
          event: 'toggleExpand', 
          isExpanded: this.isExpanded 
        });
      }
    },
  },
};
</script>

<!-- eslint-disable-next-line vue/no-root-v-if -->
<template>
  <div v-if="showHeaderActions" class="actions flex items-center gap-2">
    <button
      v-if="
        canLeaveConversation &&
        canUserEndConversation &&
        hasEndConversationEnabled &&
        showEndConversationButton
      "
      class="button transparent compact"
      :title="$t('END_CONVERSATION')"
      @click="resolveConversation"
    >
      <FluentIcon icon="sign-out" size="22" class="text-n-slate-12" />
    </button>
    <button
      v-if="showPopoutButton"
      class="button transparent compact new-window--button"
      @click="popoutWindow"
    >
      <FluentIcon icon="open" size="22" class="text-n-slate-12" />
    </button>
    <!-- Botão Expandir/Recolher -->
    <button
      class="button transparent compact expand-toggle-btn"
      :title="isExpanded ? 'Recolher' : 'Expandir'"
      @click="toggleExpand"
    >
      <FluentIcon 
        :icon="isExpanded ? 'chevron-down' : 'chevron-right'" 
        size="20" 
        class="text-n-slate-12" 
      />
    </button>
    <button
      class="button transparent compact close-button"
      :class="{
        'rn-close-button': isRNWebView,
      }"
      @click="closeWindow"
    >
      <FluentIcon icon="dismiss" size="24" class="text-n-slate-12" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.actions {
  .close-button {
    display: none;
  }

  .rn-close-button {
    display: block !important;
  }
  
  .expand-toggle-btn {
    padding: 6px;
    border-radius: 8px;
    transition: background 0.2s ease;
    
    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
