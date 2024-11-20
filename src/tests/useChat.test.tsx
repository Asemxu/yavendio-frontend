import { renderHook, act, waitFor } from '@testing-library/react';
import useChat from '../hooks/useChat';
import WS from "jest-websocket-mock";
import Message from '../interfaces/Message';

const timeout = 10000

const messageUser: Message = {
    id: 1,
    text: "Mi mensaje",
    isUser: true,
    username: "Renzo"

}

const connectServer = async () => {
    let server = new WS("ws://localhost:8080");
    const { result, } = renderHook(() => useChat())
    await server.connected;
    server.close()
    WS.clean()
    return { result, server }
}

describe('useChat', () => {
    describe('useChat', () => {
        it('get useChat Hook dont crashed', async () => {
            const { result } = await connectServer()
            act(() => {
                result.current.sendMessage(messageUser);
            });
            await waitFor(() => {
                expect(result.current).toEqual(expect.any(Object))
            })
        })
        it('get add message', async () => {
            const { result } = await connectServer()
            act(() => {
                result.current.sendMessage(messageUser)
            })
            expect(result.current.messages).toEqual([messageUser])
        }, timeout);


        it('clear Message', async () => {
            const { result } = await connectServer()
            act(() => {
                result.current.clearMessage()
            })
            expect(result.current.message).toEqual("")

        }, timeout);


        it('clear Message not empty', async () => {
            const { result } = await connectServer()
            act(() => {
                result.current.clearMessage()
            })
            expect(result.current.message).not.toEqual("No borrado")
        }, timeout);

        it('get Random Username', async () => {
            const { result } = await connectServer()
            expect(result.current.username).not.toEqual("")

        }, timeout);


        it('valid connection WebSocket', async () => {
            const { result } = await connectServer()

            expect(result.current.ws).not.toBeNull();

        }, timeout);


        it('valid connection WebSocket to url', async () => {
            const { result, server } = await connectServer()

            expect(result.current.ws?.url).toEqual((await server.connected).url);

        }, timeout);
    })
})

