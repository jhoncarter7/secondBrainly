export { };

declare global {
    namespace Express {
        export interface Request {
            user: {
                _id: string;
                userName: string;
            },
            shareLink: boolean;
        }
    }
}