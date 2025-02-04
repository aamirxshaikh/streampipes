/*
 * Licensed to the Apache Software Foundation (ASF) under one or more
 * contributor license agreements.  See the NOTICE file distributed with
 * this work for additional information regarding copyright ownership.
 * The ASF licenses this file to You under the Apache License, Version 2.0
 * (the "License"); you may not use this file except in compliance with
 * the License.  You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '@streampipes/platform-services';
import { Injectable } from '@angular/core';
import { JwtTokenStorageService } from './jwt-token-storage.service';

@Injectable({ providedIn: 'root' })
export class CurrentUserService {
    constructor(private jwtTokenStorageService: JwtTokenStorageService) {}

    public authToken$: BehaviorSubject<string> = new BehaviorSubject<string>(
        undefined,
    );
    public user$: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>(
        undefined,
    );
    public isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false,
    );
    public darkMode$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
        false,
    );

    public getCurrentUser(): UserInfo {
        return this.user$.getValue() || this.jwtTokenStorageService.getUser();
    }

    public hasRole(role: string): boolean {
        const roles = this.getCurrentUser().roles;
        return roles.includes('ROLE_ADMIN') || roles.includes(role);
    }

    public hasAnyRole(roles: string[]): boolean {
        if (Array.isArray(roles)) {
            return roles.reduce(
                (aggregator: false, role: string) =>
                    aggregator || this.hasRole(role),
                false,
            );
        }

        return false;
    }
}
