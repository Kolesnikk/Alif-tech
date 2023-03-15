export default {
  computed: {
    parseDate() {
      return (code) =>
        new Date(code).toLocaleString({
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        });
    },
  },
};
