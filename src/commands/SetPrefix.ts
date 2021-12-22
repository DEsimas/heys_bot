import { DAO } from "../database/DAO";
import { Command } from "./_Command";

export class SetPrefix extends Command {
    public override async execute(): Promise<void> {
        if(!await this.isAdmin()) {
            this.sendError(this.localization.setPrefix.access_warn);
            return;
        };

        if (this.args[1] === undefined) {
            this.sendError(this.localization.setPrefix.empty_warn);
            return;
        };

        DAO.Servers.updateOneByServerId(this.server.serverID, { prefix: this.args[1] })
            .then(() => this.sendSuccess(this.localization.setPrefix.success + this.args[1]))
            .catch(() => super.sendError(this.localization.setPrefix.db_error));
    }
}