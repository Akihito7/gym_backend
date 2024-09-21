import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/authModule/auth.module';
import { ExerciseModule } from './app/exercisesModule/exercise.module';
import { RoutineModule } from './app/routineModule/routine.module';

@Module({
  imports: [AuthModule,ExerciseModule, RoutineModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
