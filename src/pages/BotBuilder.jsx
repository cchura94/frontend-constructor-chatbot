
import axios from "axios";
import { useEffect, useState } from "react";

function BotBuilder() {

    const [activeNodeId, setActiveNodeId] = useState(null);
    const [nodes, setNodes] = useState([]);

    useEffect(() => {
        obtenerNodos()
    }, []);

    const activeNode = nodes.find(n => n.id === activeNodeId);

    const obtenerNodos = async () => {
        const res = await axios.get("http://127.0.0.1:3000/api/chatbot/nodes?botId=1")
        setNodes(res.data)
        if(res.data.length > 0){
            setActiveNodeId(res.data[0].id);
        }
    }

    return <div className="flex flex-col lg:flex-row gap-6 p-4 bg-[#f8fafc] h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto pr-4 space-y-6 custom-scrollbar">
            <header className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
                <div>
                    <h2>Configuración del Bot</h2>
                    <p>Nodo Activo: main</p>
                </div>
                <button className="px-6 py-3 rounded-xl text-sm shadow-lg flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200">Guardar Cambios</button>
            </header>
            <div className="flex gap-2 overflow-x-auto py-2">
                {nodes.map(node => (
                    <button key={node.id} onClick={() => setActiveNodeId(node.id)} className={`px-4 py-2 rounded-xl text-xs font-bold border-2 ${activeNodeId === node.id?'bg-slate-900 border-slate-900 text-white':'bg-white border-slate-100 text-salte-400 hover:border-indigo-200'}`}>{node.node_key}</button>
                ))}
                <button className="px-4 py-2 rounded-xl text-xs font-black border-2 border-dashed border-indigo-300 text-indigo-600 hover:bg-indigo-50">Nuevo Flujo</button>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="">Mensaje de Bienvenida</label>
                    <span>Flujo: {activeNode?.node_key}</span>
                </div>
                <textarea 
                    className="w-full p-5 bg-slate-50 border-2 border-slate.100 rounded-2xl"
                value={activeNode?.mensaje} ></textarea>

            </div>

        </div>
        <div className="lg:flex w-[350px] justify-center items-start pt-4">
            <div className="sticky top-4 w-[320px] h-[600px] bg-[#edd] rounded-[3em] border-[8px] border-slate-800 shadow-2xl overflow-hidden relative flex-flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl x-20"></div>
                <div className="bg-[#075e57] pt-8 pb-3 px-4 flex items-center gap-2 text-white shadow-md">
                    <div>
                        <p className="text-xs font-bold">Mi Chatbot</p>
                        <p className="text-[10px] opacity-80">En Linea</p>
                    </div>

                </div>
                <div className="flex-1 p-3 overflow-y-auto space-y-4 text-xs">

                    <pre>{JSON.stringify(activeNode, null, 2)}</pre>

                </div>

            </div>
        </div>
    </div>
}

export default BotBuilder;