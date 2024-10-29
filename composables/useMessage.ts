import { createVNode, render } from "vue";
import type { ComponentPublicInstance } from "vue";
import MessageConstructor from "~/components/common/Message.vue";

type MessageType = "success" | "error" | "info";
type MessageOptions = {
  message: string;
  type?: MessageType;
  duration?: number;
};

type MessageInstance = ComponentPublicInstance & {
  close: () => void;
  setOffset: (offset: number) => void;
};

type MessageMethod = (options: string | MessageOptions) => MessageInstance;
interface MessageApi extends MessageMethod {
  success: (
    message: string,
    options?: Omit<MessageOptions, "message" | "type">
  ) => MessageInstance;
  error: (
    message: string,
    options?: Omit<MessageOptions, "message" | "type">
  ) => MessageInstance;
  info: (
    message: string,
    options?: Omit<MessageOptions, "message" | "type">
  ) => MessageInstance;
}

let seed = 1;
const instances: any[] = [];
let messageContainer: HTMLElement | null = null;

interface Message {
  id: number;
  type: "success" | "error" | "info" | "warning";
  content: string;
  duration?: number;
}

export const useMessage = () => {
  const messages = useState<Message[]>("messages", () => []);
  let messageId = 0;

  const show = (
    content: string,
    type: Message["type"] = "info",
    duration = 3000
  ) => {
    const id = ++messageId;
    const message: Message = {
      id,
      type,
      content,
      duration,
    };

    messages.value.push(message);

    if (duration > 0) {
      setTimeout(() => {
        remove(id);
      }, duration);
    }
  };

  const remove = (id: number) => {
    messages.value = messages.value.filter((msg) => msg.id !== id);
  };

  return {
    messages,
    show,
    remove,
    success: (content: string, duration?: number) =>
      show(content, "success", duration),
    error: (content: string, duration?: number) =>
      show(content, "error", duration),
    warning: (content: string, duration?: number) =>
      show(content, "warning", duration),
    info: (content: string, duration?: number) =>
      show(content, "info", duration),
  };
};
