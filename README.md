# Nestjs-tutorial

## Controller
```ts
// express.js
router.get("/hello", async (req, res) => {
  try {
    return res.status(200).json("Hello EveryBody")
  } catch (error) {
    console.error(error);
    res.status(500).json(error)
  }
})

// nest.js
@Get('/hello')
sayHello(): string {
  return 'Hello EveryBody';
}
```

url을 가져오고 함수 리턴

express의 라우터

```bash
nest g co [router name]
// nest generate controller
```

자동으로 해당 라우트로 컨트롤러  생성해줌


## Service

```ts
@Get('/hi')
  getHi(): string {
    return this.appService.getHi();
  }
}
```

Controller의 함수명으로 서비스함수 네이밍을 하는 게 컨벤션

서비스에는 보통 DB를 조회하는 로직이나 연산 로직이 들어감.


```bash
nest g s [controller name]
```

## Entity

```js
// express.js - models
const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Comment extends Model {
  static init(sequelize) {
    return super.init({
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      }
    }, {
      modelName: 'Comment',
      tableName: 'comments',
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      sequelize,
    });
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
};
```

Express.js에서 sequelize를 활용하여 ORM을 할 때 생성할 스키마의 컬럼명, 타입, null을 허락할 것인지 등등을 선언해줬었는데 

Nest.js의 Entity 또한 같은 역할을 한다.

```ts
export class Movie {
  id: number;
  title: string;

  year: number;
  genres: string[];
}
```

## dto

```ts
@Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.moviesService.create(movieData);
  }
```

Body의 값을 Validate하고 싶을 때 dto 타입을 선언한다. 하지만 이건 런타임에서 검증을 해줄 수 없다.

```bash
npm i class-transformer class-validator
```

다음 라이브러리들을 설치하면 런타임에서 타입만으로 검증해줄 수 있다.

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // 다음 코드 추가
  await app.listen(3000);
}
bootstrap();
```

```ts
import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  readonly title: string;
  
  @IsNumber()
  readonly year: number;
  
  @IsString({ each: true })
  readonly genres: string[];
}
```

다음 데코레이터들을 사용하면 런타임에서 dto로 검증해줄 수 있다.

```json
{
    "statusCode": 400,
    "message": [
        "property hacked should not exist",
        "title must be a string",
        "year must be a number conforming to the specified constraints",
        "each value in genres must be a string"
    ],
    "error": "Bad Request"
}
```

dto에 맞지 않은 바디를 보낼 시 검증과 메세지까지 같이 해주는 것을 확인해볼 수 있다.


## Test

jest 라이브러리에서는 테스팅하고 싶은 파일에  .spec.ts 확장자를 붙이면 된다.

```ts
 describe('/movies/:id', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    }); 
    // 404 Not Found Error
  });
```

url에서 파라미터를 타입에 맞게 변환해주는 transform 옵션이 e2e테스트에서는 작동하지 않아 에러가 나는 상황이다.

테스트를 적용할 때는 테스트 어플리케이션에도 같은 세팅을 해야한다.

