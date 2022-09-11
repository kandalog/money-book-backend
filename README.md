# (個人開発) SPA EXPRESS API

## 使用技術

- Node
- Express
- Sequelize

## 技術選定理由

Express はシンプルで早い。  
SPA 開発に使われる。  
近年は使用例も増えているということで前々から気になっていた。  
今回の PF 作成が良い機会だと思い採用。

## 使用方法

Docker 化していないので、使用には Node 及び Mysql が install されている必要があります。  
v16 以降であれば問題ないです。

1. `git clone`
2. `npm install`
3. `config/config.json`を編集
4. `MYSQLでDBを作成`
5. `npx sequelize-cli db:migrate`
6. `npm start && open http://localhost:3000`
