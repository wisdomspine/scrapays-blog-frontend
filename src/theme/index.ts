import { extendBaseTheme, theme as defaultTheme } from "@chakra-ui/react";

export const theme = extendBaseTheme({
  colors: {
    ...defaultTheme.colors,
    brand: defaultTheme.colors.teal,
  },
  components: {
    Button: defaultTheme.components.Button,
    Card: defaultTheme.components.Card,
    Heading: defaultTheme.components.Heading,
    Container: defaultTheme.components.Container,
    Input: defaultTheme.components.Input,
    Form: defaultTheme.components.Form,
    Table: defaultTheme.components.Table,
    Spinner: defaultTheme.components.Spinner,
    Alert: defaultTheme.components.Alert,
    Modal: defaultTheme.components.Modal,
    FormError: defaultTheme.components.FormError,
    FormLabel: defaultTheme.components.FormLabel,
    Textarea: defaultTheme.components.Textarea,
    Progress: defaultTheme.components.Progress,
  },
});
