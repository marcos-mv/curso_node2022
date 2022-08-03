CREATE TABLE usuarios(
    nome VARCHAR(50),
    email VARCHAR(100),
    idade BIGINT;
);

INSERT into usuarios(nome, email, idade) VALUES(
    "Cecília Rodrigues",
    "celicilia@gmail.com",
    1
);

select * from usuarios where idade = 1;

select * from usuarios where nome = "Marcos Vinícius";

select * from usuarios where idade >= 24;

update usuarios set nome = "Marcos Vinícius Rodrigues" where nome = "Marcos Vinícius";

