
import app from './app.ts';
import { port } from './config/config.ts';

app.listen(port, () => {
    console.log("server listening on http://localhost:4567")
})