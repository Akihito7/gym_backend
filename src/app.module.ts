import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/authModule/auth.module';
import { ExerciseModule } from './app/exercisesModule/exercise.module';
import { RoutineModule } from './app/routineModule/routine.module';
import { TrainingSessionModule } from './app/trainingSessionModule/training-session.module';
import { UserModule } from './app/user-module/user.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './config/database/database.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, ExerciseModule, RoutineModule, TrainingSessionModule, UserModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
