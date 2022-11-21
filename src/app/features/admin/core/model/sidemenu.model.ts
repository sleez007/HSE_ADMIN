export interface ParentNodeModel{
    isOpen: boolean;
    name: string;
    icon: string;
    hasSubMenu: boolean;
    link: string | null;
    subMenu: ChildNodeModel[];
}

export interface ChildNodeModel{
    name: string;
    link: string;
}