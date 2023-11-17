export class TreeNode {
    key: number;
    left: TreeNode | null = null;
    right: TreeNode | null = null;
    isActive: boolean = false

    constructor(key: number) {
        this.key = key;
    }
}

export class TreeComponent {
    rootNode: TreeNode;

    constructor() {
        this.rootNode = new TreeNode(20);

        this.addChildNodes(this.rootNode, 10, 30);
        this.addChildNodes(this.rootNode.left!, 5, 15);
        this.addChildNodes(this.rootNode.right!, 25, 35);
    }

    addChildNodes(node: TreeNode, leftKey: number, rightKey: number): void {
        node.left = new TreeNode(leftKey);
        node.right = new TreeNode(rightKey);
    }
}
