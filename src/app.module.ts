import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/authModule/auth.module';
import { ExerciseModule } from './app/exercisesModule/exercise.module';
import { RoutineModule } from './app/routineModule/routine.module';
import { TrainingSessionModule } from './app/trainingSessionModule/training-session.module';

@Module({
  imports: [AuthModule,ExerciseModule, RoutineModule, TrainingSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
