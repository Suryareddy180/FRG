<?php
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$projectsRoot = realpath(__DIR__ . '/images/projects');

if ($projectsRoot === false || !is_dir($projectsRoot)) {
    echo json_encode(['covers' => []]);
    exit;
}

$imageExtensions = ['jpg', 'jpeg', 'png', 'webp'];
$covers = [];

$directories = scandir($projectsRoot);

if ($directories === false) {
    echo json_encode(['covers' => []]);
    exit;
}

foreach ($directories as $entry) {
    if ($entry === '.' || $entry === '..') {
        continue;
    }

    $folderPath = $projectsRoot . DIRECTORY_SEPARATOR . $entry;

    if (!is_dir($folderPath)) {
        continue;
    }

    $iterator = new RecursiveIteratorIterator(
        new RecursiveDirectoryIterator($folderPath, FilesystemIterator::SKIP_DOTS)
    );

    $firstImage = null;

    foreach ($iterator as $fileInfo) {
        if (!$fileInfo->isFile()) {
            continue;
        }

        $extension = strtolower(pathinfo($fileInfo->getFilename(), PATHINFO_EXTENSION));

        if (!in_array($extension, $imageExtensions, true)) {
            continue;
        }

        $absolutePath = $fileInfo->getPathname();
        $relativePath = str_replace('\\', '/', substr($absolutePath, strlen($projectsRoot) + 1));
        $encodedPath = implode('/', array_map('rawurlencode', explode('/', $relativePath)));

        $firstImage = '/images/projects/' . $encodedPath;
        break;
    }

    if ($firstImage !== null) {
        $covers[$entry] = $firstImage;
    }
}

ksort($covers);

echo json_encode(['covers' => $covers]);
