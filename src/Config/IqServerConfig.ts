/*
 * Copyright (c) 2019-present Sonatype, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { Config } from "./Config";
import { readFileSync } from "fs";
import { Logger } from "winston";
import { getAppLogger } from "../Application/Logger/Logger";
import { ConfigPersist } from "./ConfigPersist";
import { safeLoad } from 'js-yaml';

export class IqServerConfig extends Config {
  constructor(
    protected username: string = '', 
    protected token: string = '', 
    private host: string = '', 
    readonly logger: Logger = getAppLogger())
  {
    super(username, token, logger);
  }

  public saveFile(iqServerConfig: ConfigPersist): boolean {
    return super.saveConfigToFile(iqServerConfig, '.iq-server-config');
  }

  public getUsername(): string {
    return this.username;
  }

  public getToken(): string {
    return this.token;
  }

  public getHost(): string {
    return this.host;
  }
  
  public getConfigFromFile(
    saveLocation: string = this.getSaveLocation('.iq-server-config')
  ): IqServerConfig {
    const doc = safeLoad(readFileSync(saveLocation, 'utf8'));
    super.username = doc.Username;
    super.token = doc.Token;
    this.host = doc.Server;

    return this;
  }
}
