class File {
    constructor(
        public id: string, 
    public userId: string,
        public name: string, 
        public item: any,
        public description: string) {}
}

export { File };