module.exports = () => {
  const clients = [];

  function addClient(client) {
    clients.push(client.id);
    console.log(`${client.id} connected...`);
  }

  function removeClient(client) {
    const index = clients.indexOf(client.id);
    if (index !== -1) {
      clients.splice(index, 1);
    }
    console.log(`${client.id} disconnected...`);
  }

  return {
    addClient,
    removeClient,
    clients
  };
};
