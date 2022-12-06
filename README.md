# (個人開発) SPA EXPRESS API

## 使用技術

- Node
- Express
- Sequelize

## 技術選定理由
ファイルを1から手動で用意する必要があり、シンプル
SPA 開発によく使われる。  
フロントエンドと言語を合わせられる
近年は使用例も増えているということで前々から気になっていた。 

- Sequelize選定理由
Prismaを使用したかったが、調査ミスで有料だと勘違いしてた。
Expressの学習に使用した書籍で使われていたので利用することに
次回以降Expressを使用した開発ではPrismaを使用する


## 使用方法

Docker 化していないので、使用には Node 及び Mysql が install されている必要があります。  
v16 以降であれば問題ないです。

1. `git clone`
2. `npm install`
3. `config/config.json`を編集
4. `MYSQLでDBを作成`
5. `npx sequelize-cli db:migrate`
6. `npm start && open http://localhost:3000`

￥
