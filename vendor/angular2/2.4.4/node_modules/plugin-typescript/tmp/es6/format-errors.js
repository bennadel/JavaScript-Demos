import * as ts from 'typescript';
export function formatErrors(diags, logger) {
    diags.slice(0, 10)
        .forEach(function (diag) {
        if (diag.file) {
            var position = diag.file.getLineAndCharacterOfPosition(diag.start);
            var filename = diag.file.fileName;
            var locationText = filename + ":" + (position.line + 1) + ":" + (position.character + 1);
            if (diag.category === ts.DiagnosticCategory.Error)
                logger.error(locationText);
            else
                logger.warn(locationText);
        }
        var messageText = ts.flattenDiagnosticMessageText(diag.messageText, "\n");
        messageText = messageText + " (TS" + diag.code + ")";
        if (diag.category === ts.DiagnosticCategory.Error)
            logger.error(messageText);
        else
            logger.warn(messageText);
    });
}
