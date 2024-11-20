import { render, fireEvent, renderHook, act } from '@testing-library/react';
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

test('get useChat Hook dont crashed', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    expect(result.current).toEqual(expect.any(Object))
    WS.clean()

}, timeout);

test('get add message', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    act(() => {
        result.current.sendMessage(messageUser)
    })

    expect(result.current.messages).toEqual([messageUser])
    WS.clean()

}, timeout);


test('clear Message', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    act(() => {
        result.current.clearMessage()
    })

    expect(result.current.message).toEqual("")
    WS.clean()

}, timeout);


test('clear Message not empty', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    act(() => {
        result.current.clearMessage()
    })

    expect(result.current.message).not.toEqual("No borrado")
    WS.clean()

}, timeout);

test('get Random Username', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;


    expect(result.current.username).not.toEqual("")
    WS.clean()

}, timeout);


test('valid connection WebSocket', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    expect(result.current.ws).not.toBeNull();
    WS.clean()

}, timeout);


test('valid connection WebSocket to url', async () => {
    let server = new WS("ws://localhost:8080");
    const { result } = renderHook(() => useChat())
    await server.connected;

    expect(result.current.ws?.url).toEqual((await server.connected).url);
    WS.clean()

}, timeout);