// 模拟数据库连接
export const db = {
  users: [
    { id: 1, name: "张三" },
    { id: 2, name: "李四" },
  ],

  async findUser(id: number) {
    return this.users.find((user) => user.id === id);
  },

  async getAllUsers() {
    return this.users;
  },
};
