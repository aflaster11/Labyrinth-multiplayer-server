import {Controller, Param, Get, Post} from "routing-controllers";
import {User} from "../models/User";
import {Logger, LoggerInterface} from "../../decorators/Logger";
import {UserService} from "../services/UserService";

@Controller()
export class UserController {

    constructor(
        @Logger(__filename) private log: LoggerInterface,
        private userService : UserService
    ) {}

    @Get("/user")
    getAll() {
        return this.userService.find();
    }

    @Post("/user")
    create(user: User) {
        return this.userService.create(user)
                .then(() => this.log.info('User has been created'))
                .catch((error) => this.log.info(error));
    }


    @Get("/user/:id")
    getOne(@Param("id") id: number) {
        return "This action returns user #" + id;
    }

}
