# angular-editor
Editor de aplicações angulares no browser

O propósito deste projeto é usar o grapesjs como editor de componentes de forma a permitir a rápida geração de interfaces em angular.

## Como usar

Para fazer uso do projeto basta importar o projeto com o comando: 

```bash
yarn add angular-editor -D
```

para executar o projeto adicione ao package.json do seu projeto um script como o exemplo: 

```json
{
  ...
  "scripts": {
    "ae": "angular-editor"
  }
  ...
}
```

depois basta executar:
```bash
yarn run ae
```

O servidor do angular editor será iniciado na porta 8000, você pode mudar a porta default passando o parametro -p <outra_porta>, ex:
```json
{
  ...
  "scripts": {
    "ae": "angular-editor -p 8787"
  }
  ...
}
```
O servidor será iniciado na porta 8787.

## Contribuindo para o projeto

Para o desenvolvimento basta executar o comando: 

```bash
yarn start
```

A pasta src/components contém os componentes do grapesjs, um exemplo de um esqueleto básico de um componente:

```javascript

export default {
  name: 'nome-do-seu-componente',
  blockManager: {
    label: 'label-do-componente-na-paleta',
    content: `conteudo do componente em html`,
    category: 'categoria-do-componente',
    attributes: {
      title: 'titulo do componente',
      class: 'fa fa-youtube-play', // classe css para exibir um icone
    }
  },
  
  // função que constroe o componente
  builder: (defaultType, defaultModel, defaultView) => {
    
    return {
      // aqui fica as configurações do modelo e view para os componentes
      // as configurações aqui são as configurações disponíveis do grapejs
      // para ver exemplos de configurações consulte a documentação do grapejs
      // em: https://github.com/artf/grapesjs/wiki/Components
      model: defaultModel.extend(),
      view: defaultType.view.extend()
    };
  }
};
```

Uma vez criado o componente precisa ser registrado no arquivo src/componentes/index.js:

```javascript
import cmp from './novo-componente.cmp';

// componentes
let componentes = [painel,cmp];
```