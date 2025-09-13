import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('Spotify Clone API')
    .setDescription(
      'Backend API for a Spotify clone, with features like authentication, user management, playlists, music, and streaming.'
    )
    .setVersion('0.0.1')
    .setContact('João Guedes', 'https://github.com/joaoguedesluna', 'joaoguedesluna@gmail.com')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter the JWT token as: Bearer <token>'
      },
      'JWT-auth'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('spotify/api/v1/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true
    }
  });
}
