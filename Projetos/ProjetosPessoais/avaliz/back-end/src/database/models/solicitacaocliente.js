const SolicitacaoCliente = (sequelize, DataTypes) => {
  const SolicitacaoCliente = sequelize.define("SolicitacaoCliente", {
    serviceName: DataTypes.STRING,
    documentSign: DataTypes.STRING,
    checkout: DataTypes.STRING,
    Name: DataTypes.STRING,
    dataCar: DataTypes.STRING,
    date: DataTypes.STRING,
    cpfCnpj: DataTypes.STRING,
    Phone: DataTypes.STRING,
    Email: DataTypes.STRING,
    nameRecived: DataTypes.STRING,
    phoneRecived: DataTypes.STRING,
    placa: DataTypes.STRING,
    valorEstimadoCliente: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    complementAdress: DataTypes.STRING,
    address: DataTypes.STRING,
    district: DataTypes.STRING,
    City: DataTypes.STRING,
    State: DataTypes.STRING,
    cep: DataTypes.STRING,
    serviceTotalPrice: DataTypes.INTEGER,
    moreInfos: DataTypes.STRING,
    ip: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });

  return SolicitacaoCliente;
};

module.exports = SolicitacaoCliente;