export const useVersion = () => {
  const version = useState("version", () => "1.0.0"); // 默认版本

  const fetchVersion = async () => {
    try {
      const pkg: any = await import("~/package.json");
      version.value = pkg.version;
    } catch (error) {
      console.error("Failed to load version:", error);
    }
  };

  return {
    version,
    fetchVersion,
  };
};
