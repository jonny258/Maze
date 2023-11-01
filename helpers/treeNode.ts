export class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;

    constructor(key: number) {
        this.key = key;
    }
}
