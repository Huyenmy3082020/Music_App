import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'inspector/promises';
import { Repository } from 'typeorm';

@Injectable()
export class SessionService {

    constructor(
        @InjectRepository(Session) private readonly sessionRepository: Repository<Session>,
    ) {}

    async createSession(sessionData: any) {
        const session = this.sessionRepository.create(sessionData);
        return this.sessionRepository.save(session);
    }
    
    
}
