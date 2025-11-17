export default Dashboard;
type Dashboard = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Dashboard: import("svelte").Component<{
    idapp?: any;
}, {}, "idapp">;
type $$ComponentProps = {
    idapp?: any;
};
